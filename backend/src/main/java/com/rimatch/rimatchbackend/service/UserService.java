package com.rimatch.rimatchbackend.service;
import com.rimatch.rimatchbackend.dto.*;
import com.rimatch.rimatchbackend.util.DisplayUserConverter;
import com.rimatch.rimatchbackend.util.JWTUtils;
import com.rimatch.rimatchbackend.util.JWTUtils.TokenType;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.repository.UserRepository;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import lombok.AllArgsConstructor;
import lombok.Getter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatchRepository matchRepository;

    /*
     * Should be implemented as @Bean in AppConfig but left like this for now
     */
    final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private MatchService matchService;
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

    public LoginResponse loginUser(LoginDto loginInfo) {
        return Optional.ofNullable(userRepository.findByEmail(loginInfo.getEmail()))
                .filter(user -> passwordEncoder.matches(loginInfo.getPassword(), user.getHashedPassword()))
                .map(user -> new LoginResponse(
                        jwtUtils.generateAccessToken(user.getEmail()),
                        jwtUtils.generateRefreshToken(user.getEmail()),
                        user.isActive()
                ))
                .orElse(null);
    }

    @Getter
    @AllArgsConstructor
    public static class LoginResponse {
        private String token;
        private String refreshToken;
        private boolean active;
    }

    public User finishUserSetup(User user, SetupDto setupDto){
        modelMapper.map(setupDto,user);
        user.setActive(true);
        return userRepository.save(user);
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUserByToken(String token){
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return userRepository.findByEmail(jwtUtils.extractSubject(token, TokenType.ACCESS));
    }

    public String refreshAccessToken(String token)throws IllegalArgumentException,JwtException {
        try {
            Claims claims = jwtUtils.validateToken(token, TokenType.REFRESH);
            return jwtUtils.generateAccessToken(claims.getSubject());

        } catch (JwtException | IllegalArgumentException ex){
            throw ex;
        }
    }

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(String id){
        return userRepository.findById(id);
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

    public void insertToSeenUserIds(User user, String id){
        user.getSeenUserIds().add(id);
        userRepository.save(user);
    }

    public User updateUser(User user, UserUpdateDTO userUpdateDTO) {
        modelMapper.map(userUpdateDTO, user);
        if(!userUpdateDTO.getTags().isEmpty()){
            user.setTags(userUpdateDTO.getTags());
        }
        return userRepository.save(user);
    }
    public User addPhotos(User user,List<String> photos){
        user.getPhotos().addAll(photos);
        return userRepository.save(user);
    }

    public User removePhotos(User user,List<String> photos){
        user.getPhotos().removeAll(photos);
        return userRepository.save(user);
    }
    public User updatePreferences(User user, PreferencesUpdateDTO preferencesUpdateDTO) throws IllegalArgumentException{
        modelMapper.map(preferencesUpdateDTO,user.getPreferences());
        if(user.getPreferences().getAgeGroupMin() > user.getPreferences().getAgeGroupMax()){
            throw new IllegalArgumentException("ageGroupMin should be lower then ageGroupMax");
        }
        return userRepository.save(user);
    }

    public void blockUser(User user, String id) {
        Match match = matchService.findMatch(user.getId(), id);

        if (match != null) {
            user.getBlockedUsersIds().add(id);
            match.setAccepted(false);

            matchRepository.save(match);
            userRepository.save(user);
        } else {
            System.out.println("Match not found");
        }

    }

    public List<DisplayUserDto> listAllBlockedUsers(User user) {
        List<DisplayUserDto> users =  DisplayUserConverter.convertToDtoList(userRepository.findAllById(user.getBlockedUsersIds()));
        return users;
    }

    // add more methods as per your requirements
}