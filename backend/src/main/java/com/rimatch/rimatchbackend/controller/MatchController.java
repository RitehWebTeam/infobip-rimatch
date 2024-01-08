package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.dto.MatchDto;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.MatchService;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/match")
public class MatchController {

    @Autowired
    MatchService matchService;

    @Autowired
    UserService userService;

    @GetMapping("/potential")
    public List<DisplayUserDto> getPotentinalMatch(HttpServletRequest request){
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        List<DisplayUserDto> list = matchService.findPotentialMatches(user);
        return list;
    }

    @PostMapping("/accept")
    public ResponseEntity<?> accept(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        userService.insertToSeenUserIds(user,matchDto.getUserId());

        Optional<User> matchedUser = userService.getUserById(matchDto.getUserId());

        Match match = matchService.findMatch(user.getId(),matchedUser.get().getId());

        if(match != null){
            return ResponseEntity.ok(matchService.finishMatch(match,true));
        }

        return ResponseEntity.ok(matchService.saveMatch(user.getId(),matchDto.getUserId()));
    }

    @PostMapping("/reject")
    public ResponseEntity<?> reject(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);

        userService.insertToSeenUserIds(user,matchDto.getUserId());
        Optional<User> matchedUser = userService.getUserById(matchDto.getUserId());
        matchedUser.ifPresent(value -> userService.insertToSeenUserIds(value, user.getId()));

        Match match = matchService.findMatch(user.getId(),matchedUser.get().getId());

        if(match != null){
            return ResponseEntity.ok(matchService.finishMatch(match,false));
        }

        return ResponseEntity.ok("Test");
    }
}
