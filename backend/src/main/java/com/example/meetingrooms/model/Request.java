package com.example.meetingrooms.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomName;
    private String user;
    private String timeSlot;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    // Getters
    public Long getId() {
        return id;
    }

    public String getRoomName() {
        return roomName;
    }

    public String getUser() {
        return user;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public RequestStatus getStatus() {
        return status;
    }
    private LocalDate bookingDate;

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }
}
