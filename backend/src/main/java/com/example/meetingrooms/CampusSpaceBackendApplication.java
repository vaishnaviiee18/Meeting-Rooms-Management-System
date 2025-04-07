package com.example.meetingrooms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.example.meetingrooms.repository")
public class CampusSpaceBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(CampusSpaceBackendApplication.class, args);
	}
}
