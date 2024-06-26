package com.rimatch.rimatchbackend.service;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.Message;
import com.rimatch.rimatchbackend.model.Preferences;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import com.rimatch.rimatchbackend.repository.MessageRepository;
import com.rimatch.rimatchbackend.repository.UserRepository;
import com.rimatch.rimatchbackend.util.DisplayUserConverter;

import lombok.Getter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ComparisonOperators;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired MessageRepository messageRepository;

    @Autowired
    public MatchService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Match saveMatch(String id1, String id2) {
        return matchRepository.save(new Match(id1, id2));
    }

    public Match findMatch(String userId1, String userId2) {
        Optional<Match> match1 = matchRepository.findByFirstUserIdAndSecondUserId(userId1, userId2);

        if (match1.isPresent()) {
            return match1.get();
        }

        Optional<Match> match2 = matchRepository.findByFirstUserIdAndSecondUserId(userId2, userId1);

        return match2.orElse(null);

    }

    public Match finishMatch(Match match, boolean status) {
        match.setFinished(true);
        match.setAccepted(status);
        return matchRepository.save(match);
    }

    public List<DisplayUserDto> findPotentialMatches(User user, int skip) {
        List<User> mappedResults = mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.sort(Direction.DESC, "_id"),
                        Aggregation.match(
                                Criteria.where("active").is(true)
                                        .and("_id").nin(user.getSeenUserIds())
                                        .and("age").lte(user.getPreferences().getAgeGroupMax())
                                        .and("gender").is(user.getPreferences().getPartnerGender())
                                        .and("location").is(user.getLocation())
                                        .and("email").ne(user.getEmail())),
                        Aggregation.match(Criteria.where("age").gte(user.getPreferences().getAgeGroupMin())),
                        Aggregation.skip(skip),
                        Aggregation.limit(5)),
                "users", User.class).getMappedResults();

        // Create a new list for the filtered users
        List<User> filteredList = new ArrayList<>();

        // Filter the list by preferences
        filterUsersByPreferences(user, mappedResults, filteredList);

        // Convert and return the filtered list
        return DisplayUserConverter.convertToDtoList(filteredList);
    }

    public static void filterUsersByPreferences(User currentUser, List<User> userList, List<User> filteredList) {
        for (User user : userList) {
            Preferences listPreferences = user.getPreferences();

            if (listPreferences != null) {
                // Check age group
                if (currentUser.getPreferences() != null &&
                        (currentUser.getAge() < listPreferences.getAgeGroupMin() ||
                                currentUser.getAge() > listPreferences.getAgeGroupMax())) {
                    continue; // Skip this user
                }

                // Check gender preference
                if (currentUser.getPreferences() != null &&
                        !currentUser.getGender().equals(listPreferences.getPartnerGender())) {
                    continue; // Skip this user
                }

                // Add the user to the filtered list
                filteredList.add(user);
            }
        }
    }

    public List<DisplayUserDto> getAllSuccessfulMatchedUsers(User user) {
        MatchOperation matchOperation = Aggregation.match(
                Criteria.where("finished").is(true)
                        .and("accepted").is(true)
                        .andOperator(
                                new Criteria().orOperator(
                                        Criteria.where("firstUserId").is(user.getId().toString()),
                                        Criteria.where("secondUserId").is(user.getId().toString()))));

        ProjectionOperation projectionOperation = Aggregation.project().and(
                        ConditionalOperators
                                .when(ComparisonOperators.Eq.valueOf("firstUserId").equalToValue(user.getId().toString()))
                                .thenValueOf("secondUserId")
                                .otherwiseValueOf("firstUserId"))
                .as("matchedUserId");

        Aggregation aggregation = Aggregation.newAggregation(matchOperation, projectionOperation);

        List<MatchedUserIdDTO> matchedIds = mongoTemplate.aggregate(aggregation, "matches", MatchedUserIdDTO.class).getMappedResults();

        List<String> matchedUserIds = matchedIds.stream()
                .map(matchedUserDTO -> matchedUserDTO.getMatchedUserId())
                .collect(Collectors.toList());

        List<DisplayUserDto> userDtos = DisplayUserConverter.convertToDtoList(userRepository.findAllById(matchedUserIds));

        for (DisplayUserDto userDto : userDtos) {
            userDto.setChatId(findMatch(user.getId(), userDto.getId()).getId());
        }

        Map<String, Message> lastMessages = new HashMap<>();
        for (DisplayUserDto userDto : userDtos) {
            lastMessages.put(userDto.getId(), messageRepository.findFirstByChatIdOrderByTimestampDesc(userDto.getChatId()));
        }

        // Sort userDtos based on last message timestamp
        userDtos.sort(Comparator.comparing((DisplayUserDto userDto) -> {
            Message lastMessage = lastMessages.get(userDto.getId());
            return (lastMessage != null) ? lastMessage.getTimestamp() : null;
        }, Comparator.nullsLast(Comparator.reverseOrder())));

        return userDtos;
    }

    public Optional<DisplayUserDto> findMatchedUserById(String id, User authUser) {
        Match match = findMatch(authUser.getId(), id);

        if (match != null) {
            var user = userRepository.findById(id);
            if (user.isPresent()) {
                DisplayUserDto userDto = DisplayUserConverter.convertToDto(user.get());
                userDto.setChatId(match.getId());
                return Optional.of(userDto);
            }
        }
        return Optional.empty();
    }

    @Getter
    private static class MatchedUserIdDTO {
        private String matchedUserId;
    }
}