package com.rimatch.rimatchbackend.repository;

import com.rimatch.rimatchbackend.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportRepository extends MongoRepository<Report, String> {
}