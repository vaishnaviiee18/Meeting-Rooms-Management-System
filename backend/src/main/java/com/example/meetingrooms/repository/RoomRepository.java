package com.example.meetingrooms.repository;

import com.example.meetingrooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByType(String type);
    List<Room> findByCapacityGreaterThanEqual(int capacity);
    List<Room> findByNameContainingIgnoreCase(String name);
    Optional<Room> findByName(String name);
}