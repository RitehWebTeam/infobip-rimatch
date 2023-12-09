package com.rimatch.rimatchbackend.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class LoginDto {
    @NotNull(message = "Email field cannot be null!")
    @NotBlank(message = "Email field cannot be blank!")
    private String email;

    @NotNull(message = "Password field cannot be null!")
    @NotBlank(message = "Password field cannot be blank!")
    private String password;
}

