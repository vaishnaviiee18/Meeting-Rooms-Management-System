package com.example.meetingrooms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.service.RequestService;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private RequestService requestService;


    // Fetch all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // Fetch a request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new request
    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        Request created = requestService.createRequest(request);
        return ResponseEntity.ok(created);
    }

    // Update an existing request by ID
    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long id, @RequestBody Request updatedRequest) {
        Request result = requestService.updateRequest(id, updatedRequest);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    // Delete a request by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoint for letter generation
    @GetMapping("/{id}/generate-letter")
    public ResponseEntity<String> generateLetter(@PathVariable Long id) {
        Optional<Request> optionalRequest = requestService.getRequestById(id);

        // Check if the request exists
        if (optionalRequest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Request request = optionalRequest.get();

        // Check if the request status is APPROVED
        if (request.getStatus() != RequestStatus.APPROVED) {
            return ResponseEntity.badRequest().body("This request has not been approved yet.");
        }

        // Fetch the current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName(); // Assuming the username is the representative's email or ID

        // Check if the current user is the representative of the club
        if (!currentUsername.equals(request.getUser())) {
            return ResponseEntity.status(403).body("You are not authorized to generate a letter for this request.");
        }

        // Generate and return the letter content
        String letterContent = generateLetterContent(request);
        return ResponseEntity.ok(letterContent);
    }

    private String generateLetterContent(Request request) {
        // Example of the letter content, this can be styled and formatted according to your requirements
        return "<h2>Room Booking Confirmation</h2>" +
                "<p>The room <strong>" + request.getRoomName() + "</strong> is assigned to the <strong>" +
                request.getUser() + "</strong> for the time slot <strong>" +
                request.getTimeSlot() + "</strong> on <strong>" + request.getBookingDate() + "</strong>.</p>" +
                "<p>Thank you for using our booking system.</p>";
    }
}
