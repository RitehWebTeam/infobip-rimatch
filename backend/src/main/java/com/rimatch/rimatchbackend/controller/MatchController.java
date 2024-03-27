package com.rimatch.rimatchbackend.controller;

import com.infobip.ApiException;
import com.rimatch.rimatchbackend.dto.DisplayUserDto;
import com.rimatch.rimatchbackend.dto.MatchDto;
import com.rimatch.rimatchbackend.lib.InfobipClient;
import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.MatchService;
import com.rimatch.rimatchbackend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/match")
public class MatchController {

    @Autowired
    MatchService matchService;

    @Autowired
    UserService userService;

    @Autowired
    private InfobipClient infobipClient;

    @Value("${infobip.active}")
    private boolean isInfobipActive;

    @GetMapping("/potential")
    public List<DisplayUserDto> getPotentialMatch(HttpServletRequest request,
            @RequestParam(value = "skip", required = false) Integer skip) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        int skipValue = skip != null ? skip : 0;
        List<DisplayUserDto> list = matchService.findPotentialMatches(user, skipValue);
        return list;
    }

    @PostMapping("/accept")
    public ResponseEntity<Match> accept(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto)
            throws ApiException {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        userService.insertToSeenUserIds(user, matchDto.getUserId());

        Optional<User> matchedUser = userService.getUserById(matchDto.getUserId());

        Match match = matchService.findMatch(user.getId(), matchedUser.get().getId());

        if (match != null) {
            if(isInfobipActive) {
                var recepients = new ArrayList<>(List.of("dominikkovacevic6@gmail.com"));
                infobipClient.sendEmail(recepients, "You got a match!", user.getFirstName());
                infobipClient.sendSms(matchedUser.get().getFirstName(), user.getFirstName());
            }
            return ResponseEntity.ok(matchService.finishMatch(match, true));

        }

        return ResponseEntity.ok(matchService.saveMatch(user.getId(), matchDto.getUserId()));
    }

    @PostMapping("/reject")
    public ResponseEntity<?> reject(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);

        userService.insertToSeenUserIds(user, matchDto.getUserId());
        Optional<User> matchedUser = userService.getUserById(matchDto.getUserId());
        matchedUser.ifPresent(value -> userService.insertToSeenUserIds(value, user.getId()));

        Match match = matchService.findMatch(user.getId(), matchedUser.get().getId());

        if (match != null) {
            return ResponseEntity.ok(matchService.finishMatch(match, false));
        }

        return ResponseEntity.ok("Test");
    }

    // all matches for user sending the reuqest
    @GetMapping("/all")
    public ResponseEntity<List<DisplayUserDto>> getAllMatches(HttpServletRequest request,
            @RequestParam(required = false, defaultValue = "false") Boolean sortByRecentMessages) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);
        List<DisplayUserDto> list = matchService.getAllSuccessfulMatchedUsers(user);
        return ResponseEntity.ok(list);
    }
}
