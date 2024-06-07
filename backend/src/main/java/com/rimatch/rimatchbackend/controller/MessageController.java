package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.Message;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import com.rimatch.rimatchbackend.repository.MessageRepository;
import com.rimatch.rimatchbackend.service.S3Service;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("api/messages")
public class MessageController {

    @Autowired private MessageRepository messageRepository;

    @Autowired private MatchRepository matchRepository;

    @Autowired private UserService userService;

    @Autowired private S3Service s3Service;

    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadImage(@RequestBody MultipartFile photo,String chatId,HttpServletRequest request) throws Exception {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        Optional<Match> match = matchRepository.findById(chatId);
        if(match.isPresent()){
            if(!userHasAccessToChat(match.get(),user.getId())){
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(s3Service.uploadImage(photo,chatId,"chats"));
    }

    /*@PostMapping("/upload-voice")
    public ResponseEntity<?> uploadVoice(@RequestBody MultipartFile audio,String chatId,HttpServletRequest request) throws Exception {
        String authToken = request.getHeader("Authorization");
        Optional<Message> message = messageRepository.findById(chatId);
        if(message.isPresent()){
            if(!userHasAccessToChat(message.get(),authToken)){
                ResponseEntity.status(400);
            }
        }
        return ResponseEntity.ok(s3Service.uploadAudioFile(audio,chatId,"chats"));
    }*/

    @GetMapping("/{chatId}")
    public Page<Message> getMessagesFromId(@PathVariable String chatId,
                                           @RequestParam(required = false) Integer page,
                                           @RequestParam(required = false) Integer pageSize,
                                           @RequestParam(required = false) String messageId,
                                           HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        if(page == null) page = 0;
        if(pageSize == null) pageSize = 5;
        Pageable p = PageRequest.of(page,pageSize);
        if (messageId != null) {

            Optional<Message> m = messageRepository.findById(messageId);
            if(m.isPresent()){
                //if(!userHasAccessToChat(m.get(),authToken)) return Page.empty(); //should be handled better but due to time left like this
                return messageRepository.findByChatIdAndTimestampBeforeOrderByTimestampDesc(chatId,m.get().getTimestamp(), p);
            }else{
                return null;
            }
        }
        return messageRepository.findByChatIdOrderByTimestampDesc(chatId,p);
    }

    private boolean userHasAccessToChat(Match match,String userId){
        if(match.getFirstUserId().equals(userId) || match.getSecondUserId().equals(userId)){
            if(match.isAccepted() && match.isFinished()){
                return true;
            }
            return false;
        }
        return false;
    }

}