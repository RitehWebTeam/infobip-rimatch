package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.User;
import lombok.Data;

@Data
public class DisplayUserDto {

    private String id;

    private String firstName;

    private String lastName;

    private String description;

    private String profileImageUrl;

    private String location;

    private Character gender;

    public void initDisplayUser(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.description = user.getDescription();
        this.profileImageUrl = user.getProfileImageUrl();
        this.location = user.getLocation();
        this.gender = user.getGender();
    }

}
