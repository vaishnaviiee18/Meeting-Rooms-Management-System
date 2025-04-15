package com.example.meetingrooms.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.meetingrooms.model.Request;
import com.example.meetingrooms.model.RequestStatus;
import com.example.meetingrooms.repository.RequestRepository;

@Service
public class RequestService {

    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Optional<Request> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public Request createRequest(Request request) {
        request.setStatus(RequestStatus.PENDING); // default status
        return requestRepository.save(request);
    }

    public Request updateRequest(Long id, Request updatedRequest) {
        return requestRepository.findById(id)
                .map(request -> {
                    request.setRoomName(updatedRequest.getRoomName());
                    request.setDate(updatedRequest.getDate());
                    request.setTimeSlot(updatedRequest.getTimeSlot());
                    request.setStatus(updatedRequest.getStatus());

                    // Update user's club name (if needed)
                    if (request.getUser() != null && updatedRequest.getUser() != null) {
                        request.getUser().setClub(updatedRequest.getUser().getClub());
                    }

                    return requestRepository.save(request);
                })
                .orElse(null);
    }

    public void deleteRequest(Long id) {
        requestRepository.deleteById(id);
    }

    public List<Request> getRequestsByStatus(RequestStatus status) {
        return requestRepository.findByStatus(status.name());
    }

    public List<Request> getRequestsByClub(String clubName) {
        return requestRepository.findByClubName(clubName);
    }

    public List<Map.Entry<String, Long>> getFrequentlyBookedRooms() {
        List<Request> requests = requestRepository.findAll();

        Map<String, Long> frequencyMap = requests.stream()
                .collect(Collectors.groupingBy(Request::getRoomName, Collectors.counting()));

        return frequencyMap.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(8)
                .collect(Collectors.toList());
    }

    public String generateLetterContent(Request request) {
        return "<h2>Room Booking Confirmation</h2>" +
                "<p>The room <strong>" + request.getRoomName() + "</strong> is assigned to the <strong>" +
                request.getUser().getClub() + "</strong> for the time slot <strong>" +
                request.getTimeSlot() + "</strong> on <strong>" + request.getDate() + "</strong>.</p>" +
                "<p>Thank you for using our booking system.</p>";
    }
}
