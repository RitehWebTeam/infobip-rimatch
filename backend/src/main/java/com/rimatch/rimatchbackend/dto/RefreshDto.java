package com.rimatch.rimatchbackend.dto;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class RefreshDto {
    @Valid
    @NotNull(message = "refreshToken field cannot be null!")
    @NotNull private String refreshToken;
}
