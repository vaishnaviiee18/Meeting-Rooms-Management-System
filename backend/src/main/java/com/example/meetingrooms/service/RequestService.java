package com.example.meetingrooms.service;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.Room;
import com.example.meetingrooms.repository.RequestRepository;
import com.example.meetingrooms.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    // Add this method to your existing RequestService class

    public List<Request> getRequestsByUserEmail(String email) {
        return requestRepository.findByUserEmail(email);
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    @Transactional
    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    @Transactional
    public Request updateRequest(Long id, Request updatedRequest) {
        return requestRepository.findById(id)
                .map(request -> {
                    request.setPurpose(updatedRequest.getPurpose());
                    request.setStatus(updatedRequest.getStatus());
                    request.setTimeSlot(updatedRequest.getTimeSlot());
                    request.setBookingDate(updatedRequest.getBookingDate());
                    request.setClubName(updatedRequest.getClubName());

                    if (updatedRequest.getRoom() != null) {
                        request.setRoom(updatedRequest.getRoom());
                    }

                    if (updatedRequest.getUser() != null) {
                        request.setUser(updatedRequest.getUser());
                    }

                    return requestRepository.save(request);
                })
                .orElse(null);
    }

    @Transactional
    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

//    public List<Request> getRequestsByRoomNameAndDate(String roomName, LocalDate date) {
//        return requestRepository.findByRoom_NameAndBookingDate(roomName, date);
//    }
//
//    public List<Request> getRequestsByUserId(Long userId) {
//        return requestRepository.findByUser_Id(userId);
//    }
//
//    public List<Request> getRequestsByClubName(String clubName) {
//        return requestRepository.findByClubName(clubName);
//    }

    public List<Room> getFrequentlyBookedRooms() {
        List<Request> allRequests = requestRepository.findAll();
        Map<Room, Integer> roomBookingCount = new HashMap<>();

        // Count bookings for each room
        for (Request request : allRequests) {
            Room room = request.getRoom();
            roomBookingCount.put(room, roomBookingCount.getOrDefault(room, 0) + 1);
        }

        // Sort rooms by booking count and return top 5
        return roomBookingCount.entrySet().stream()
                .sorted(Map.Entry.<Room, Integer>comparingByValue().reversed())
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }
}