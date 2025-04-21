package com.example.meetingrooms.controller;

import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Create a new room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody Room room) {
        try {
            Room createdRoom = roomService.createRoom(room);
            return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    // Get all rooms
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return ResponseEntity.of(roomService.getRoomById(id));
    }

    // Update room
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        try {
            Room updatedRoom = roomService.updateRoom(id, roomDetails);
            return new ResponseEntity<>(updatedRoom, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete room
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Room deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Filter rooms by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Room>> getRoomsByType(@PathVariable String type) {
        List<Room> rooms = roomService.getRoomsByType(type);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Filter rooms by minimum capacity
    @GetMapping("/capacity/{capacity}")
    public ResponseEntity<List<Room>> getRoomsByCapacity(@PathVariable int capacity) {
        List<Room> rooms = roomService.getRoomsByMinimumCapacity(capacity);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Search rooms by name
    @GetMapping("/search")
    public ResponseEntity<List<Room>> searchRooms(@RequestParam String name) {
        List<Room> rooms = roomService.searchRoomsByName(name);
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Initialize sample data
    @PostMapping("/initialize")
    public ResponseEntity<Map<String, String>> initializeRooms() {
        roomService.initializeRooms();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Sample room data initialized");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}