package com.rimatch.rimatchbackend.service;

import com.rimatch.rimatchbackend.model.Match;
import com.rimatch.rimatchbackend.model.Report;
import com.rimatch.rimatchbackend.repository.MatchRepository;
import com.rimatch.rimatchbackend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private MatchService matchService;

    public void createReport(String userId, String reportedId, String description) {
        Match match = matchService.findMatch(userId, reportedId);

        if (match == null || !match.isAccepted()) {
            return;
        }

        match.setAccepted(false);
        matchRepository.save(match);
        Report report = new Report(userId, reportedId, description);
        reportRepository.save(report);
    }

}