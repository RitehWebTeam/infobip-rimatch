package com.rimatch.rimatchbackend.service;
import com.rimatch.rimatchbackend.dto.LoginDto;
import com.rimatch.rimatchbackend.dto.RegisterDto;
import com.rimatch.rimatchbackend.dto.SetupDto;
import com.rimatch.rimatchbackend.util.JWTUtils;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    private final MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;
    /*
     * Should be implemented as @Bean in AppConfig but left like this for now
     */
    final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    public UserService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public User registerUser(RegisterDto registerInfo) throws InvalidParameterException{

        if(getUserByEmail(registerInfo.getEmail()) != null){
            throw new InvalidParameterException("Account with this email already exists!");
        }

        User user = new User(
                registerInfo.getEmail(),
                registerInfo.getFirstName(),
                registerInfo.getLastName(),
                passwordEncoder.encode(registerInfo.getPassword()),
                registerInfo.getGender(),
                registerInfo.getAge());
        return userRepository.save(user);
    }

    public Map<String,String> loginUser(LoginDto loginInfo){
        Map<String, String> tokenPair = new HashMap<>();
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(loginInfo.getEmail()));
        if(userOptional.isPresent()){
            User user = userOptional.get();
            if(passwordEncoder.matches(loginInfo.getPassword(), user.getHashedPassword())){
                tokenPair.put("token",jwtUtils.generateAccessToken(user.getEmail()));
                tokenPair.put("refresh", jwtUtils.generateRefreshToken(user.getEmail()));
                return tokenPair;
            }
        }
        return null;
    }

    public User finishUserSetup(User user, SetupDto setupDto){
        user.setActive(true);
        user.setPreferences(setupDto.getPreferences());
        user.setLocation(setupDto.getLocation());
        user.setPhoneNumber(setupDto.getPhoneNumber());
        user.setDescription(setupDto.getDescription());
        user.setProfileImageUrl(setupDto.getProfileImageUrl());
        return userRepository.save(user);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUserByToken(String token){
        token = token.substring(7);
        return userRepository.findByEmail(jwtUtils.extractUsername(token));
    }

    public String refreshAccessToken(String token)throws IllegalArgumentException,JwtException {
        try {
            Claims claims = jwtUtils.getAllClaims(token);
            jwtUtils.validateToken(token);
            if (!claims.get("type").equals("refresh")) {
                throw new IllegalArgumentException();
            }
            String accessToken = jwtUtils.generateAccessToken(jwtUtils.extractUsername(token));
            return accessToken;

        } catch (JwtException | IllegalArgumentException ex){
            throw ex;
        }
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User getRandomUser(String currentUserEmail,char genderPreference) {
        // Exclude the current user
        List<User> users = mongoTemplate.aggregate(
                Aggregation.newAggregation(
                        Aggregation.match(Criteria.where("email").ne(currentUserEmail)),
                        Aggregation.match(Criteria.where("gender").is(genderPreference)),
                        Aggregation.match(Criteria.where("active").is(true)),
                        Aggregation.sample(1)
                ),
                "users", User.class).getMappedResults();
        return users.isEmpty() ? null : users.get(0);
    }
    // add more methods as per your requirements
}
