package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.Preferences;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateDTO {

    @Valid

    @Min(value = 18,message = "This field cannot be less then 18!")
    @Max(value = 99,message = "This field cannot be more then 99! I guess?")
    private int age;

    private String description;

    private String phoneNumber;

    private String location;

    private Preferences preferences;

    private String firstName;

    private String lastName;

    private Character gender;

    private String favouriteSong;

    private List<String> tags = new ArrayList<>();
}