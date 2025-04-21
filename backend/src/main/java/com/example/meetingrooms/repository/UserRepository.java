package com.example.meetingrooms.repository;

import com.example.meetingrooms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // Login, fetching, validation

    boolean existsByEmail(String email); // Signup validation
}
