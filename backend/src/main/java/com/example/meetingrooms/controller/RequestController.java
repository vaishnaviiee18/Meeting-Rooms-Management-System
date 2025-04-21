package com.example.meetingrooms.controller;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.model.User;
import com.example.meetingrooms.repository.RoomRepository;
import com.example.meetingrooms.repository.UserRepository;
import com.example.meetingrooms.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    // Get requests by room and date
//    @GetMapping("/room/{roomName}/date/{date}")
//    public ResponseEntity<List<Request>> getRequestsByRoomAndDate(
//            @PathVariable String roomName,
//            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
//
//        List<Request> requests = requestService.getRequestsByRoomNameAndDate(roomName, date);
//        return ResponseEntity.ok(requests);
//    }

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
    public ResponseEntity<?> createRequest(@RequestBody Map<String, Object> requestData) {
        try {

            String purpose = (String) requestData.get("purpose");
            String timeSlot = (String) requestData.get("timeSlot");
            LocalDate bookingDate = LocalDate.parse((String) requestData.get("bookingDate"));
            String clubName = (String) requestData.get("clubName");
            String userEmail = (String) requestData.get("userEmail");

            if (userEmail == null || userEmail.isEmpty()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "User email is required");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            Map<String, Object> roomMap = (Map<String, Object>) requestData.get("room");
            String roomName = (String) roomMap.get("name");
            Long roomId = null;
            if (roomMap.containsKey("id")) {
                if (roomMap.get("id") instanceof Integer) {
                    roomId = Long.valueOf((Integer) roomMap.get("id"));
                } else if (roomMap.get("id") instanceof Long) {
                    roomId = (Long) roomMap.get("id");
                }
            }

            Room room = null;
            if (roomId != null) {
                Optional<Room> roomById = roomRepository.findById(roomId);
                if (roomById.isPresent()) {
                    room = roomById.get();
                }
            }

            if (room == null && roomName != null) {
                Optional<Room> roomByName = roomRepository.findByName(roomName);
                if (roomByName.isPresent()) {
                    room = roomByName.get();
                }
            }

            if (room == null) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Room not found: " + roomName);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            Optional<User> userOptional = userRepository.findByEmail(userEmail);
            User user = userOptional.orElse(null);

            Request request = new Request();
            request.setPurpose(purpose);
            request.setTimeSlot(timeSlot);
            request.setBookingDate(bookingDate);
            request.setClubName(clubName);
            request.setRoom(room);
            request.setUser(user);
            request.setUserEmail(userEmail);
            request.setStatus(RequestStatus.PENDING);

            Request created = requestService.createRequest(request);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // Add this method to your existing RequestController class

    // Get requests by user email (for the logged-in user)
    @GetMapping("/user-email/{email}")
    public ResponseEntity<List<Request>> getRequestsByUserEmail(@PathVariable String email) {
        try {
            List<Request> requests = requestService.getRequestsByUserEmail(email);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}