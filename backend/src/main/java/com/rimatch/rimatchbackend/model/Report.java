package com.rimatch.rimatchbackend.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reports")
@Data
public class Report {
    @Id
    private String id;

    @NonNull
    @NotBlank
    private String userId;

    @NonNull
    @NotBlank
    private String reportedUserId;

    private String reportReason;

    public Report(String userId, String reportedUserId, String reportReason) {
        this.userId = userId;
        this.reportedUserId = reportedUserId;
        this.reportReason = reportReason;
    }
}