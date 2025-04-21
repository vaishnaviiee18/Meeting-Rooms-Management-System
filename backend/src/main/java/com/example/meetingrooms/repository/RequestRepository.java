package com.example.meetingrooms.repository;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByStatus(RequestStatus status);

    @Query("SELECT r.room FROM Request r GROUP BY r.room HAVING COUNT(r) > 1")
    List<Room> findFrequentlyBookedRooms();

    @Query("SELECT req FROM Request req WHERE req.room.name = :roomName AND req.bookingDate = :bookingDate")
    List<Request> findByRoomNameAndBookingDate(String roomName, LocalDate bookingDate);
}
