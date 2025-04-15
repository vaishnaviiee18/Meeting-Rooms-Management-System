package com.example.meetingrooms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.repository.RequestRepository;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

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
        return requestRepository.findById(id).map(request -> {
            request.setRoomName(updatedRequest.getRoomName());
            request.setUser(updatedRequest.getUser());
            request.setTimeSlot(updatedRequest.getTimeSlot());
            request.setStatus(updatedRequest.getStatus());
            return requestRepository.save(request);
        }).orElse(null);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public List<Request> getRequestsByStatus(RequestStatus status) {
        return requestRepository.findByStatus(status.toString());
    }
}
