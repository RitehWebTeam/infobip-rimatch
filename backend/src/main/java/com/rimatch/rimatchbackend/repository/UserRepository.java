package com.rimatch.rimatchbackend.repository;
import com.rimatch.rimatchbackend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);

}


