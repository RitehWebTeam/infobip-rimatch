package com.rimatch.rimatchbackend.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.rimatch.rimatchbackend.util.converter.ToLowerCaseConverter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class LoginDto {
    @NotNull(message = "Email field cannot be null!")
    @NotBlank(message = "Email field cannot be blank!")
    @JsonSerialize(converter = ToLowerCaseConverter.class)
    private String email;

    @NotNull(message = "Password field cannot be null!")
    @NotBlank(message = "Password field cannot be blank!")
    private String password;
}
