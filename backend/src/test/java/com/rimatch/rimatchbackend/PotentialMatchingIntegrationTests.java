package com.rimatch.rimatchbackend;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.model.Preferences;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.UserRepository;
import com.rimatch.rimatchbackend.service.MatchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@TestPropertySource(locations = "classpath:test.properties")
@Testcontainers
class PotentialMatchingIntegrationTests {

    @Autowired
    private MatchService matchService;
    @Autowired
    private UserRepository userRepository;

    @Container
    @ServiceConnection
    private static final MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.8");

    @DisplayName("findPotentialMatches")
    @Nested
    @Transactional
    class FindPotentialMatches {

        private User currentUser;

        private static int partnerIndex = 0;

        private static User createPartnerUser(User current) {
            User partnerUser = new User();
            partnerUser.setActive(true);
            partnerUser.setAge(current.getPreferences().getAgeGroupMin());
            partnerUser.setGender(current.getPreferences().getPartnerGender());
            partnerUser.setLocation(current.getLocation());
            partnerUser.setPreferences(new Preferences(current.getAge() - 1, current.getAge() + 1, current.getGender()));
            partnerUser.setSeenUserIds(new ArrayList<>());
            partnerUser.setEmail(current.getEmail() + "partner" + partnerIndex++);
            return partnerUser;
        }

        @BeforeEach
        public void setup() {
            currentUser = new User();
            currentUser.setAge(25);
            currentUser.setGender('M');
            currentUser.setLocation("New York");
            currentUser.setPreferences(new Preferences(20, 30, 'F'));
            currentUser.setSeenUserIds(new ArrayList<>());
            currentUser.setEmail("test@test-email.com");
        }

        @Test
        @DisplayName("Should not return inactive users")
        public void findPotentialMatches_doesNotReturnInactiveUsers() {
            User inactiveUser = new User();
            inactiveUser.setActive(false);
            userRepository.save(inactiveUser);

            List<DisplayUserDto> potentialMatches = matchService.findPotentialMatches(currentUser, 0);

            assertThat(potentialMatches).isEmpty();
        }

        @Test
        @DisplayName("Should not return users that have already been seen")
        public void findPotentialMatches_doesNotReturnSeenUsers() {
            User seenUser = createPartnerUser(currentUser);
            seenUser = userRepository.save(seenUser);
            currentUser.getSeenUserIds().add(seenUser.getId());

            List<DisplayUserDto> potentialMatches = matchService.findPotentialMatches(currentUser, 0);

            assertThat(potentialMatches).isEmpty();
        }

        @Test
        @DisplayName("Should not return users outside of the current user's age preference")
        public void findPotentialMatches_doesNotReturnUsersOutsideAgePreference() {
            User ageLessThan = createPartnerUser(currentUser);
            ageLessThan.setAge(currentUser.getPreferences().getAgeGroupMin() - 2);
            userRepository.save(ageLessThan);

            User ageGreaterThan = createPartnerUser(currentUser);
            ageGreaterThan.setAge(currentUser.getPreferences().getAgeGroupMax() + 2);
            userRepository.save(ageGreaterThan);

            List<DisplayUserDto> potentialMatches = matchService.findPotentialMatches(currentUser, 0);

            assertThat(potentialMatches).isEmpty();
        }

        @Test
        @DisplayName("Should not return users whose gender is not preferred")
        public void findPotentialMatches_doesNotReturnUsersWithDifferentGenderPreference() {
            User differentGender = createPartnerUser(currentUser);
            char nonPreferredGender = currentUser.getPreferences().getPartnerGender() == 'M' ? 'F' : 'M';
            differentGender.setGender(nonPreferredGender);
            userRepository.save(differentGender);

            List<DisplayUserDto> potentialMatches = matchService.findPotentialMatches(currentUser, 0);

            assertThat(potentialMatches).isEmpty();
        }

        @Test
        @DisplayName("Should return a list of potential matches")
        public void findPotentialMatches_returnsListOfPotentialMatches() {
            User partnerUser = createPartnerUser(currentUser);
            partnerUser = userRepository.save(partnerUser);

            List<DisplayUserDto> potentialMatches = matchService.findPotentialMatches(currentUser, 0);

            assertThat(potentialMatches).isNotEmpty();
            assertThat(potentialMatches).first().extracting(DisplayUserDto::getId).isEqualTo(partnerUser.getId());
        }
    }

}
