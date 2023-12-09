package com.rimatch.rimatchbackend.repository;

import com.rimatch.rimatchbackend.dto.SetupDto;
import com.rimatch.rimatchbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);

}


