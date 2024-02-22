package com.rimatch.rimatchbackend.repository;

import com.rimatch.rimatchbackend.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;

public interface MessageRepository extends MongoRepository<Message, String> {
    Page<Message> findByChatIdOrderByTimestampDesc(String chatId, Pageable pageable);
    Page<Message> findByChatIdAndTimestampBeforeOrderByTimestampDesc(String chatId, Date Timestamp,Pageable pageable);
    Message findFirstByChatIdOrderByTimestampDesc(String chatId);
}

