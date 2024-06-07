package com.rimatch.rimatchbackend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "matches")
@Data
public class Match {

    @Id
    private String id;

    @NonNull
    @NotBlank
    private String firstUserId;

    @NonNull
    @NotBlank
    private String secondUserId;

    private boolean accepted = false;

    private boolean finished = false;
}