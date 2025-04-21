package com.example.meetingrooms.controller;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.service.RequestService;
import com.example.meetingrooms.repository.RoomRepository;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private RoomRepository roomRepository;

    // Get requests by room and date
    @GetMapping("/room/{roomName}/date/{date}")
    public ResponseEntity<List<Request>> getRequestsByRoomAndDate(
            @PathVariable String roomName,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<Request> requests = requestService.getRequestsByRoomNameAndDate(roomName, date);

        if (requests.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(requests);
        }
    }

    // Get all requests
    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // Get a request by ID
    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        return requestService.getRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new request
    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        String userClubName = "MockClub"; // Replace with actual logic later

        request.setClubName(userClubName);
        request.setStatus(RequestStatus.PENDING);

        if (request.getRoom() != null && request.getRoom().getName() != null) {
            Room room = roomRepository.findByName(request.getRoom().getName())
                    .orElseThrow(() -> new RuntimeException("Room not found"));
            request.setRoom(room);
        }

        Request created = requestService.createRequest(request);
        return ResponseEntity.ok(created);
    }

    // Update an existing request
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

    // Generate letter for an approved request
    @GetMapping("/{id}/generate-letter")
    public ResponseEntity<String> generateLetter(@PathVariable Long id) {
        Optional<Request> optionalRequest = requestService.getRequestById(id);
        if (optionalRequest.isEmpty()) return ResponseEntity.notFound().build();

        Request request = optionalRequest.get();

        if (request.getStatus() != RequestStatus.APPROVED) {
            return ResponseEntity.badRequest().body("This request has not been approved yet.");
        }

        String letterContent = generateLetterContent(request);
        return ResponseEntity.ok(letterContent);
    }

    // Get frequently booked rooms
    @GetMapping("/frequently-booked")
    public ResponseEntity<List<Room>> getFrequentlyBookedRooms() {
        return ResponseEntity.ok(requestService.getFrequentlyBookedRooms());
    }

    // Get requests by club identifier
    @GetMapping("/club/{clubIdentifier}")
    public ResponseEntity<List<Request>> getRequestsByClub(@PathVariable String clubIdentifier) {
        List<Request> filteredRequests = requestService.getAllRequests().stream()
                .filter(request -> {
                    User user = request.getUserEntity();
                    return user != null &&
                            (clubIdentifier.equalsIgnoreCase(user.getClub()) ||
                             clubIdentifier.equalsIgnoreCase(user.getFullName()));
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(filteredRequests);
    }

    private String generateLetterContent(Request request) {
        return "<h2>Room Booking Confirmation</h2>" +
                "<p>The room <strong>" + request.getRoom().getName() + "</strong> is assigned to <strong>" +
                request.getUserEntity().getClub() + "</strong> for the time slot <strong>" +
                request.getTimeSlot() + "</strong> on <strong>" + request.getBookingDate() + "</strong>.</p>" +
                "<p>Thank you for using our booking system.</p>";
    }
}
