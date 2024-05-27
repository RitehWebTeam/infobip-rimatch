package com.rimatch.rimatchbackend;

import com.rimatch.rimatchbackend.model.Preferences;
import com.rimatch.rimatchbackend.model.User;
import com.rimatch.rimatchbackend.service.MatchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.context.TestPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@TestPropertySource(locations = "classpath:test.properties")
@Testcontainers
class RimatchBackendApplicationTests {

	@Container
	@ServiceConnection
	private static final MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.8");

	@Test
	void contextLoads() {
		assertThat(mongoDBContainer.isRunning()).isTrue();
	}

}
