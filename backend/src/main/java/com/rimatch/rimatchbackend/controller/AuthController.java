package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.LoginDto;
import com.rimatch.rimatchbackend.dto.RefreshDto;
import com.rimatch.rimatchbackend.dto.RegisterDto;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.UserService;
import com.rimatch.rimatchbackend.service.UserService.TokenPair;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody RegisterDto registerdto) {
        User user;
        try{
            user = userService.registerUser(registerdto);
        }catch (InvalidParameterException ex){
            Map<String,String> map = new HashMap<>();
            map.put("message",ex.getMessage());
            return ResponseEntity.status(400).body(map);
        }
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(allowCredentials = "true", origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDto loginDto, HttpServletResponse response) {
        TokenPair tokenPair = userService.loginUser(loginDto);
    
        if (tokenPair == null) {
            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
    
        response.addCookie(userService.setRefreshTokenCookie(tokenPair.getRefreshToken()));
        return new ResponseEntity<>(Map.of("token", tokenPair.getToken()), HttpStatus.OK);
    }

    @CrossOrigin(allowCredentials = "true", origins = "http://localhost:5173")
    @GetMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue("refreshToken") String refreshToken) {
        try {
            String token = userService.refreshAccessToken(refreshToken);
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Invalid refresh token!"));
        }
    }

    @CrossOrigin(allowCredentials = "true", origins = "http://localhost:5173")
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {
        if (refreshToken != null) {
            response.addCookie(userService.clearRefreshTokenCookie());
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(Map.of("message", "Logged out successfully!"));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String,String> handleValidationException(MethodArgumentNotValidException ex){
        Map<String,String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) ->{
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName,errorMessage);
        });
        return errors;
    }

}
