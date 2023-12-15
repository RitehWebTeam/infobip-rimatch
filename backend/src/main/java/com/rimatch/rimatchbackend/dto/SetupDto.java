package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.Preferences;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class SetupDto {

    @Valid

    @NotNull(message = "Description cannot be null")
    private String description;

    @NotNull(message = "Profile Image URL cannot be null")
    private String profileImageUrl;

    @NotNull(message = "Phone Number cannot be null")
    private String phoneNumber;

    @NotNull(message = "Location cannot be null")
    private String location;

    @NotNull(message = "Preferences cannot be null")
    private Preferences preferences;
}

