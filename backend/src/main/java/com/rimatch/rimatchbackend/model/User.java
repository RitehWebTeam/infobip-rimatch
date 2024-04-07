package com.rimatch.rimatchbackend.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "users")
@Data
public class User {

    @Valid

    @Id
    private String id;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    @Indexed(unique = true)
    private String email;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    private String firstName;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    private String lastName;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    private String hashedPassword;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    private Character gender;

    @NotNull(message = "This field cannot be null!")
    @NotBlank(message = "This field cannot be blank!")
    @Min(value = 18,message = "This field cannot be less then 18!")
    @Max(value = 99,message = "This field cannot be more then 99! I guess?")
    private Integer age;

    private boolean active;

    private String description;

    private String profileImageUrl;

    private String phoneNumber;

    private String location;

    private Preferences preferences;

    private String favouriteSong;

    private List<String> tags = new ArrayList<>();

    private List<String> seenUserIds = new ArrayList<>();

    private List<String> photos = new ArrayList<>();

    private Date lastSeen;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

    public User(@NonNull String email, @NonNull String firstName, @NonNull String lastName,
                @NonNull String hashedPassword,
                @NonNull char gender,@NonNull int age) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.hashedPassword = hashedPassword;
        this.gender = gender;
        this.age = age;
    }

}