package com.example.meetingrooms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.meetingrooms.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // ✅ Used for login
    Optional<User> findByEmail(String email);

    // ✅ Useful to check during signup if a user already exists
    boolean existsByEmail(String email);
}
