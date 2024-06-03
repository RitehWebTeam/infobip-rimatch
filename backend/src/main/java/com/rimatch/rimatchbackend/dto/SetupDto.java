package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.Preferences;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SetupDto {

    @Valid

    @NotNull(message = "Description cannot be null")
    private String description;

    private String profileImageUrl;

    @NotNull(message = "Phone Number cannot be null")
    private String phoneNumber;

    @Min(value = 1,message = "This field cannot be less then 1!")
    @Max(value = 100,message = "This field cannot be more then 100! I guess?")
    @NotNull(message = "radius cannot be null")
    private Double radius;

    @NotNull(message = "location cannot be null")
    private GeoJsonPoint location;

    @NotNull(message = "Preferences cannot be null")
    private Preferences preferences;

    private String favouriteSong;

    private List<String> tags = new ArrayList<>();
}

