package com.rimatch.rimatchbackend.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.rimatch.rimatchbackend.util.converter.ToLowerCaseConverter;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterDto {
    @NotNull(message = "Email field cannot be null!")
    @NotBlank(message = "Email field cannot be blank!")
    @JsonDeserialize(converter = ToLowerCaseConverter.class)
    private String email;

    @NotNull(message = "First name field cannot be null!")
    @NotBlank(message = "First name field cannot be blank!")
    private String firstName;

    @NotNull(message = "Last name field cannot be null!")
    @NotBlank(message = "Last name field cannot be blank!")
    private String lastName;

    @NotNull(message = "Password field cannot be null!")
    @NotBlank(message = "Password field cannot be blank!")
    private String password;

    @NotNull(message = "Gender field cannot be null!")
    private Character gender;

    @NotNull(message = "Age field cannot be null!")
    @Min(value = 18, message = "Age cannot be less than 18!")
    @Max(value = 99, message = "Age cannot be more than 99!")
    private Integer age;
}
