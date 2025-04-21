package com.example.meetingrooms.service;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.repository.RequestRepository;
import com.example.meetingrooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    public Request updateRequest(Long id, Request updatedRequest) {
        Optional<Request> existingRequest = getRequestById(id);
        if (existingRequest.isPresent()) {
            Request request = existingRequest.get();
            request.setRoom(updatedRequest.getRoom());
            request.setPurpose(updatedRequest.getPurpose());
            request.setTimeSlot(updatedRequest.getTimeSlot());
            request.setBookingDate(updatedRequest.getBookingDate());
            request.setStatus(updatedRequest.getStatus());
            request.setClubName(updatedRequest.getClubName());
            request.setUserEntity(updatedRequest.getUserEntity());
            return requestRepository.save(request);
        }
        return null;
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public List<Room> getFrequentlyBookedRooms() {
        return requestRepository.findFrequentlyBookedRooms();
    }

    public List<Request> getRequestsByRoomNameAndDate(String roomName, LocalDate date) {
        return requestRepository.findByRoomNameAndBookingDate(roomName, date);
    }
}
