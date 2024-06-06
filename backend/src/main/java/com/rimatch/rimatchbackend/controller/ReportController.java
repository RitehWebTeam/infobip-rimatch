package com.rimatch.rimatchbackend.controller;

import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.ReportService;
import com.rimatch.rimatchbackend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/reports")
public class ReportController {

    @Autowired
    private UserService userService;
    @Autowired
    ReportService reportService;
    @PostMapping("/add")
    public ResponseEntity<?> addReport(@RequestParam String reportedUserId, @RequestParam String report, HttpServletRequest request) {
        String authToken = request.getHeader("Authorization");
        User user = userService.getUserByToken(authToken);

        try {
            reportService.createReport(user.getId(), reportedUserId, report);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}