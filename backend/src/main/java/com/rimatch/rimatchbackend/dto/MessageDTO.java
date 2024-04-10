package com.rimatch.rimatchbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageDTO {
    @NotBlank
    private String receiverId;

    @NotBlank
    private String chatId;

    @NotBlank
    private String content;
}