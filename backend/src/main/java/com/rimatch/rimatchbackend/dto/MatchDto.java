package com.rimatch.rimatchbackend.dto;

import jakarta.validation.Valid;
import lombok.Getter;
import lombok.NonNull;

@Getter
public class MatchDto {

    @Valid

    @NonNull
    private String userId;

}
