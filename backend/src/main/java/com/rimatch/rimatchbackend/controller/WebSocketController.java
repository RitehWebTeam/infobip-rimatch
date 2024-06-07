package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.MessageDTO;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.Message;
import com.rimatch.rimatchbackend.model.MessageType;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import com.rimatch.rimatchbackend.repository.MessageRepository;
import com.rimatch.rimatchbackend.service.UserService;
import com.rimatch.rimatchbackend.util.JWTUtils;
import io.jsonwebtoken.JwtException;
import jakarta.validation.constraints.Null;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MatchRepository matchRepository;

    @MessageMapping("/send-message")
    public void sendMessage(@Payload MessageDTO messageDTO, @Header("Authorization") String token) {
        try {
            User sender = userService.getUserByToken(token.substring(7));
            Optional<Match> m = matchRepository.findById(messageDTO.getChatId());
            //check if message is sent to proper chat to proper user
            if(m.isEmpty()) return;
            if(!m.get().getFirstUserId().equals(sender.getId()) && !m.get().getSecondUserId().equals(sender.getId())) return;
            if(!m.get().getFirstUserId().equals(messageDTO.getReceiverId()) && !m.get().getSecondUserId().equals(messageDTO.getReceiverId())) return;
            if(m.get().isFinished() && !m.get().isAccepted()) return; //"blocked"

            String receiverId = messageDTO.getReceiverId();
            Message message = new Message(messageDTO.getChatId(),sender.getId(),receiverId,messageDTO.getMessageType(),messageDTO.getContent());
            if(messageDTO.getMessageType() == MessageType.REPLY){
                if(!messageDTO.getReplyId().isEmpty()){
                    message.setReplyId(message.getReplyId());
                }else{
                    return;
                }
            }
            messageRepository.save(message);
            messagingTemplate.convertAndSend(receiverId+"/queue/messages", message);
        } catch (JwtException | IllegalArgumentException ex) {
            // Handle JWT exception
        }
    }
}