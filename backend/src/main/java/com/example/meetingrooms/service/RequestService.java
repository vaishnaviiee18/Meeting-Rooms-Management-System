package com.example.meetingrooms.service;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    // Constructor injection
    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<Request> getRequestsByStatus(String status) {
        return requestRepository.findByStatus(status);
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Request createRequest(Request request) {
        request.setStatus("pending");
        return requestRepository.save(request);
    }

    public Request updateRequest(Long id, Request updatedRequest) {
        return requestRepository.findById(id)
                .map(request -> {
                    request.setClubName(updatedRequest.getClubName());
                    request.setRoomName(updatedRequest.getRoomName());
                    request.setDate(updatedRequest.getDate());
                    request.setStatus(updatedRequest.getStatus());
                    return requestRepository.save(request);
                })
                .orElse(null);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }
}
