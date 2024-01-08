package com.rimatch.rimatchbackend.repository;

import com.rimatch.rimatchbackend.model.Match;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MatchRepository extends MongoRepository<Match,String> {

    Optional<Match> findByFirstUserIdAndSecondUserId(String firstUserId,String secondUserId);

}
