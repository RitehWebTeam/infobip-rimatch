package com.rimatch.rimatchbackend.controller;

import com.fasterxml.jackson.databind.ser.std.StdArraySerializers;
import com.rimatch.rimatchbackend.model.Message;
import com.rimatch.rimatchbackend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import javax.management.Query;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/messages")
public class MessageController {

    @Autowired MessageRepository messageRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/{chatId}")
    public Page<Message> getMessagesFromId(@PathVariable String chatId,
                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer pageSize,
                                           @RequestParam(required = false) String messageId) {
        if(page == null) page = 0;
        if(pageSize == null) pageSize = 20;
        Pageable p = PageRequest.of(page,pageSize);
        if (messageId != null) {

            Optional<Message> m = messageRepository.findById(messageId);
            if(m.isPresent()){

                return messageRepository.findByChatIdAndTimestampBeforeOrderByTimestampDesc(chatId,m.get().getTimestamp(), p);
            }else{
                return null;
            }
        }
        return messageRepository.findByChatIdOrderByTimestampDesc(chatId,p);
    }
}