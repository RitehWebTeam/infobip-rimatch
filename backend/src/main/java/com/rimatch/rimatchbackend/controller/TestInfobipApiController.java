package com.rimatch.rimatchbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.rimatch.rimatchbackend.lib.SendEmailLib;
import com.rimatch.rimatchbackend.util.converter.ToLowerCaseConverter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@RestController
@RequestMapping("api/infobip")
public class TestInfobipApiController {

  @Autowired
  private SendEmailLib sendEmailLib;

  @Getter
  private static class EmailTestBody {
    @NotNull(message = "Message field cannot be null!")
    @NotBlank(message = "Message field cannot be blank!")
    private String message;
    @NotNull(message = "Recipient field cannot be null!")
    @NotBlank(message = "Recipient field cannot be blank!")
    @JsonSerialize(converter = ToLowerCaseConverter.class)
    private String recipient;
    @NotNull(message = "Subject field cannot be null!")
    @NotBlank(message = "Subject field cannot be blank!")
    private String subject;
  }

  @PostMapping("/email-test")
  public ResponseEntity<?> postMethodName(@RequestBody EmailTestBody body) {
    var recepients = new ArrayList<>(List.of(body.getRecipient()));
    try {
      sendEmailLib.sendEmail(recepients, body.getSubject(), body.getMessage());
      return ResponseEntity.ok().build();
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
  }
}