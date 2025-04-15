package com.example.meetingrooms.service;

import com.example.meetingrooms.model.Club;
import com.example.meetingrooms.repository.ClubRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    private final ClubRepository clubRepository;

    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    public List<Club> getAllClubs() {
        return clubRepository.findAll();
    }

    public Optional<Club> getClubById(Long id) {
        return clubRepository.findById(id);
    }

    public Club addClub(Club club) {
        if (!clubRepository.existsByName(club.getName())) {
            return clubRepository.save(club);
        }
        throw new RuntimeException("Club with the same name already exists.");
    }

    public void deleteClub(Long id) {
        clubRepository.deleteById(id);
    }
}
