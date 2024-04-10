package com.rimatch.rimatchbackend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "messages")
@Data
public class Message {

    @Id
    private String id;

    @NotNull
    private String chatId;

    @NotNull
    private String senderId;

    @NotNull
    private String receiverId;

    @NotBlank
    private String content;

    private Date timestamp = new Date();
}