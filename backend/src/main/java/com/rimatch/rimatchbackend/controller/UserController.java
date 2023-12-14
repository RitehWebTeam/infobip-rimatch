package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.SetupDto;
import com.rimatch.rimatchbackend.lib.SendEmailLib;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.Getter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private SendEmailLib sendEmailLib;

    @Autowired
    private UserService userService;

    @GetMapping("/potentional")
    public ResponseEntity<?> getPotentinalMatch(HttpServletRequest request){
        String authToken = request.getHeader("Authorization");
        /*
        Replace with something that doesn't query a database but ok for now
        */
        User user = userService.getUserByToken(authToken);
        User randomUser = userService.getRandomUser(user.getEmail(),user.getPreferences().getPartnerGender());

        if (randomUser != null) {
            return new ResponseEntity<>(randomUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User user = userService.getUserByEmail(email);

        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<User> getUser(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/me/setup")
    public ResponseEntity<?> setupUser(@Valid @RequestBody SetupDto setupDto,HttpServletRequest request){
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        if(user.isActive()){
            Map<String,String> map = new HashMap<>();
            map.put("message","Setup was already done!");
            return ResponseEntity.badRequest().body(map);
        }

        user = userService.finishUserSetup(user,setupDto);
        return ResponseEntity.ok(user);
    }


    // add more endpoints as per your requirements

    /*ExceptionHandler for requests with bad Arguments - should be moved to different file*/

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

    @Getter
    private static class EmailTestBody {
        private String message;
    }

    @PostMapping("/email-test")
    public ResponseEntity postMethodName(@RequestBody EmailTestBody body) {
        var recepients = new ArrayList<>(List.of("andrej.bozic6@gmail.com"));
        try {
            sendEmailLib.sendEmail(recepients, "RiMatchTest", body.getMessage());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        
    }
    

}