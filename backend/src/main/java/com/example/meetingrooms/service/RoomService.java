package com.example.meetingrooms.service;

import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Create
    @Transactional
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    // Read
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    // Update
    @Transactional
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        room.setName(roomDetails.getName());
        room.setType(roomDetails.getType());
        room.setCapacity(roomDetails.getCapacity());
        room.setImg(roomDetails.getImg());

        return roomRepository.save(room);
    }

    // Delete
    @Transactional
    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        roomRepository.delete(room);
    }

    // Custom queries
    public List<Room> getRoomsByType(String type) {
        return roomRepository.findByType(type);
    }

    public List<Room> getRoomsByMinimumCapacity(int capacity) {
        return roomRepository.findByCapacityGreaterThanEqual(capacity);
    }

    public List<Room> searchRoomsByName(String name) {
        return roomRepository.findByNameContainingIgnoreCase(name);
    }

    // Initialize sample room data
    @Transactional
    public void initializeRooms() {
        // Check if rooms already exist
        if (roomRepository.count() > 0) {
            return;
        }

        // Add sample rooms
        roomRepository.save(new Room("A3-010", "Classroom", 30, "/assets/classroom.jpg"));
        roomRepository.save(new Room("B2-105", "Classroom", 25, "/assets/classroom2.jpg"));
        roomRepository.save(new Room("Auditorium", "Event Hall", 200, "/assets/auditorium.jpg"));
        roomRepository.save(new Room("Seminar Hall", "Lecture Room", 80, "/assets/seminar.jpg"));
        roomRepository.save(new Room("Library Hall", "Study Area", 50, "/assets/library.jpg"));
        roomRepository.save(new Room("Quiet Study Zone", "Study Area", 20, "/assets/quiet_study.jpg"));
        roomRepository.save(new Room("Conference Room A", "Meeting Room", 20, "/assets/conference.jpg"));
        roomRepository.save(new Room("Boardroom B", "Meeting Room", 15, "/assets/boardroom.jpg"));
        roomRepository.save(new Room("Backyard", "Outdoor Space", 100, "/assets/backyard.jpg"));
        roomRepository.save(new Room("Rooftop Terrace", "Outdoor Space", 50, "/assets/rooftop.jpg"));
        roomRepository.save(new Room("Computer Lab 1", "Laboratory", 40, "/assets/computer_lab.jpg"));
        roomRepository.save(new Room("Electronics Lab", "Laboratory", 30, "/assets/electronics_lab.jpg"));
    }
}