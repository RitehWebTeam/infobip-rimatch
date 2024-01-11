package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.SetupDto;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/potential")
    public ResponseEntity<?> getPotentinalMatch(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        /*
         * Replace with something that doesn't query a database but ok for now
         */
        User user = userService.getUserByToken(authToken);
        var randomUsers = userService.getRandomUser(user.getEmail(), user.getPreferences().getPartnerGender());

        if (randomUsers != null) {
            return new ResponseEntity<>(randomUsers, HttpStatus.OK);
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

}