package com.rimatch.rimatchbackend.dto;

import com.rimatch.rimatchbackend.model.MessageType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageDTO {
    @NotBlank
    private String receiverId;

    @NotBlank
    private String chatId;

    @NotBlank
    private MessageType messageType;

    @NotBlank
    private String content;

    private String replyId;
}