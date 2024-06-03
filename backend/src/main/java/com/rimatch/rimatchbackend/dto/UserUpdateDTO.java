package com.rimatch.rimatchbackend.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateDTO {

    @Valid

    @Min(value = 18,message = "This field cannot be less then 18!")
    @Max(value = 99,message = "This field cannot be more then 99! I guess?")
    private Integer age;

    private String description;

    private String phoneNumber;

    private String firstName;

    private String lastName;

    private Character gender;

    private GeoJsonPoint location;

    @Min(value = 1,message = "This field cannot be less then 1!")
    @Max(value = 100,message = "This field cannot be more then 100! I guess?")
    private Double radius;

    private String favouriteSong;

    private String profileImageUrl;

    private List<String> tags = new ArrayList<>();
}