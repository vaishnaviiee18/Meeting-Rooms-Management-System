package com.example.meetingrooms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.meetingrooms.model.Club;

public interface ClubRepository extends JpaRepository<Club, Long> {
    Optional<Club> findByName(String name); // Updated to match the field name
    boolean existsByName(String name);       // Ensure this method is available if you need to check existence
}
