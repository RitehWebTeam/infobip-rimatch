package com.rimatch.rimatchbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class RimatchBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(RimatchBackendApplication.class, args);
	}

}

//Added just for first deployment
@RestController
class MyController {

	@CrossOrigin
	@GetMapping("/")
	public Map<String, String> getMessage() {
		Map<String, String> response = new HashMap<>();
		response.put("message", "backend running");
		return response;
	}
}