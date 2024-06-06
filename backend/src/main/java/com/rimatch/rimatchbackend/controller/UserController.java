package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.dto.PreferencesUpdateDTO;
import com.rimatch.rimatchbackend.dto.SetupDto;
import com.rimatch.rimatchbackend.dto.UserUpdateDTO;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.S3Service;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

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
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

     @Autowired
     private S3Service s3Service;

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

    @GetMapping("/block/all")
    public ResponseEntity<List<DisplayUserDto>> getAllBlockedUsers(HttpServletRequest request,
                                                              @RequestParam(required = false, defaultValue = "false") Boolean sortByRecentMessages) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        List<DisplayUserDto> list = userService.listAllBlockedUsers(user);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/me/setup")
    public ResponseEntity<?> setupUser(@Valid @RequestPart("data") SetupDto setupDto, @RequestPart("photo") MultipartFile file, HttpServletRequest request) throws Exception {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        if(user.isActive()){
            Map<String,String> map = new HashMap<>();
            map.put("message","Setup was already done!");
            return ResponseEntity.badRequest().body(map);
        }
        if(setupDto.getPreferences().getAgeGroupMax() < setupDto.getPreferences().getAgeGroupMin()){
            return ResponseEntity.badRequest().body(createErrorMap("ageGroupMax must be higher or equal to ageGroupMin"));
        }
        String url = s3Service.uploadFile(file);
        setupDto.setProfileImageUrl(url);
        user = userService.finishUserSetup(user,setupDto);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me/update/user")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserUpdateDTO userUpdateDTO,HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        User updatedUser = userService.updateUser(user, userUpdateDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/me/update/preferences")
    public ResponseEntity<?> updatePreferences(@Valid @RequestBody PreferencesUpdateDTO preferencesUpdateDTO, HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        try{
            userService.updatePreferences(user, preferencesUpdateDTO);
        }catch (IllegalArgumentException ex){
            return ResponseEntity.badRequest().body(createErrorMap(ex.getMessage()));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/me/profilePicture")
    public ResponseEntity<?> changeProfilePicure(@RequestBody MultipartFile photo,HttpServletRequest request){
        if (!photo.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body(createErrorMap("File "+photo.getOriginalFilename()+" is not an image so it can't be used!"));
        }
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        String newProfileImageUrl;
        try {
            newProfileImageUrl = s3Service.uploadFile(photo);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        String oldProfileImageUrl = user.getProfileImageUrl();
        s3Service.removeImage(oldProfileImageUrl);
        
        UserUpdateDTO update = new UserUpdateDTO();
        update.setProfileImageUrl(newProfileImageUrl);
        userService.updateUser(user,update);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/me/addPhotos")
    public ResponseEntity<?> uploadPhotos(@RequestBody List<MultipartFile> photos,HttpServletRequest request) throws Exception {
        for (MultipartFile photo : photos) {
            if (!photo.getContentType().startsWith("image/")) {
                return ResponseEntity.badRequest().body(createErrorMap("File "+photo.getOriginalFilename()+" is not an image so it can't be used!"));
            }
        }
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        List<String> urls = new ArrayList<>();
        for (MultipartFile photo : photos) {
            String url = s3Service.uploadFile(photo);
            urls.add(url);
        }
        userService.addPhotos(user,urls);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/me/removePhotos")
    public ResponseEntity<?> removePhotos(@RequestBody List<String> urls, HttpServletRequest request){
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        List<String> userPhotos = user.getPhotos();
        urls.retainAll(userPhotos);
        for(String url:urls){
                s3Service.removeFile(s3Service.getObjectFromURL(url));
        }
        userService.removePhotos(user,urls);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<User> blockUser(@PathVariable String id, HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        userService.blockUser(user, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

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

    private Map<String, String> createErrorMap(String errorMessage) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("error", errorMessage);
        return errorMap;
    }

}