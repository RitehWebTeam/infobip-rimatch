package com.rimatch.rimatchbackend.services;

import com.rimatch.rimatchbackend.model.Preferences;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.MatchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


public class MatchServiceTest {

    @Nested
    @DisplayName("filterUsersByPreferences")
    class FilterUsersByPreferences {

        private User currentUser;
        private List<User> userList;
        private List<User> filteredList;

        @BeforeEach
        public void setup() {
            currentUser = new User();
            currentUser.setAge(25);
            currentUser.setGender('M');
            currentUser.setPreferences(new Preferences(20, 30, 'F'));

            userList = new ArrayList<>();
            filteredList = new ArrayList<>();
        }

        @Test
        @DisplayName("Should not include users when current user's age is outside of their preference")
        public void filterUsersByPreferences_filtersOutUsersOutsideAgeRange() {
            User userOutsideAgeRange = new User();
            userOutsideAgeRange.setAge(35);
            userOutsideAgeRange.setGender('F');
            currentUser.setAge(25);
            userOutsideAgeRange.setPreferences(new Preferences(30, 40, 'M'));
            userList.add(userOutsideAgeRange);

            MatchService.filterUsersByPreferences(currentUser, userList, filteredList);

            assertThat(filteredList).isEmpty();
        }

        @Test
        @DisplayName("Should not include users when current user's gender is different from their preference")
        public void filterUsersByPreferences_filtersOutUsersWithDifferentGenderPreference() {
            User userWithDifferentGenderPreference = new User();
            userWithDifferentGenderPreference.setAge(25);
            userWithDifferentGenderPreference.setGender('F');
            userWithDifferentGenderPreference.setPreferences(new Preferences(20, 30, 'F'));
            userList.add(userWithDifferentGenderPreference);

            MatchService.filterUsersByPreferences(currentUser, userList, filteredList);

            assertThat(filteredList).isEmpty();
        }

        @Test
        @DisplayName("Should include users when all preferences match")
        public void filterUsersByPreferences_includesUsersWithMatchingPreferences() {
            User userWithMatchingPreferences = new User();
            userWithMatchingPreferences.setAge(25);
            userWithMatchingPreferences.setGender('F');
            userWithMatchingPreferences.setPreferences(new Preferences(20, 30, 'M'));
            userList.add(userWithMatchingPreferences);

            MatchService.filterUsersByPreferences(currentUser, userList, filteredList);

            assertThat(filteredList).contains(userWithMatchingPreferences);
        }

        @Test
        @DisplayName("Should not include users when their preferences are null")
        public void filterUsersByPreferences_filtersOutUsersWithNullPreferences() {
            User userWithNullPreferences = new User();
            userWithNullPreferences.setAge(25);
            userWithNullPreferences.setGender('F');
            userWithNullPreferences.setPreferences(null);
            userList.add(userWithNullPreferences);

            MatchService.filterUsersByPreferences(currentUser, userList, filteredList);

            assertThat(filteredList).isEmpty();
        }
    }
}
