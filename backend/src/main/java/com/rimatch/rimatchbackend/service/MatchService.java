package com.rimatch.rimatchbackend.service;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import com.rimatch.rimatchbackend.repository.UserRepository;
import com.rimatch.rimatchbackend.util.DisplayUserConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatchService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MatchRepository matchRepository;

    @Autowired
    public MatchService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Match saveMatch(String id1, String id2){
        return matchRepository.save(new Match(id1,id2));
    }

    public Match findMatch(String user1, String user2) {
        Optional<Match> match1 = matchRepository.findByFirstUserIdAndSecondUserId(user1, user2);

        if(match1.isPresent()){
            return match1.get();
        }

        Optional<Match> match2 = matchRepository.findByFirstUserIdAndSecondUserId(user2, user1);

        return match2.orElse(null);

    }

    public Match finishMatch(Match match,boolean status){
        match.setFinished(true);
        match.setAccepted(status);
        return matchRepository.save(match);
    }

    public List<DisplayUserDto> findPotentialMatches(User user){

        return DisplayUserConverter.convertToDtoList(mongoTemplate.aggregate(
                Aggregation.newAggregation(

                        Aggregation.match(
                                Criteria.where("active").is(true)
                                        .and("_id").nin(user.getSeenUserIds())
                                        .and("age").lte(user.getPreferences().getAgeGroupMax())
                                        .and("gender").is(user.getPreferences().getPartnerGender())
                                        .and("location").is(user.getLocation())
                                        .and("email").ne(user.getEmail())
                        ),
                        //Second age parametar needs to defined separatenly because of limitations of the org.bson.Document
                        Aggregation.match(Criteria.where("age").gte(user.getPreferences().getAgeGroupMin())),

                        Aggregation.limit(10)
                ),
                "users", User.class).getMappedResults());
    }

}
