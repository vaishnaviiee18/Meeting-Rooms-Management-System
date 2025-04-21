package com.example.meetingrooms.controller;

import com.example.meetingrooms.model.User;
import com.example.meetingrooms.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")  // Allow requests from all origins — adjust in production
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.registerUser(user);  // Handles password hashing
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.loginUser(user);  // Validates user credentials
    }
}
