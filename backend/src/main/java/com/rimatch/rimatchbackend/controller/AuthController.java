package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.LoginDto;
import com.rimatch.rimatchbackend.dto.RegisterDto;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.UserService;
import com.rimatch.rimatchbackend.service.UserService.LoginResponse;

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

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginDto loginDto, HttpServletResponse response) {
        LoginResponse loginResponseData = userService.loginUser(loginDto);
    
        if (loginResponseData == null) {
            return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
        }
    
        return new ResponseEntity<>(
            Map.of("token", loginResponseData.getToken(), "active", loginResponseData.isActive(), "refreshToken", loginResponseData.getRefreshToken()),
            HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> body) {
        try {
            final String refreshToken = body.get("refreshToken");
            String token = userService.refreshAccessToken(refreshToken);
            boolean active = userService.getUserByToken(token).isActive();
            return ResponseEntity.ok(Map.of("token", token, "active", active));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Invalid refresh token!"));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout() {
        // TODO: Invalidate refresh token
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
