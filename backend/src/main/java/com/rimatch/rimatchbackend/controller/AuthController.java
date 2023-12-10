package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.LoginDto;
import com.rimatch.rimatchbackend.dto.RegisterDto;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.UserService;
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
@RequestMapping("/auth")
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

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> signUpUser(@Valid @RequestBody LoginDto loginDto) {
        String token = userService.loginUser(loginDto);
        Map<String, String> response = new HashMap<>();
        if(token != null){
            response.put("token",token);
            return ResponseEntity.ok(response);
        } else {
            response.put("message","Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }
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
