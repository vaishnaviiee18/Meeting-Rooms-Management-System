package com.campus.management.repository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.example.meetingrooms.CampusSpaceBackendApplication;
import com.example.meetingrooms.model.Club;
import com.example.meetingrooms.repository.ClubRepository;

@SpringBootTest(classes = CampusSpaceBackendApplication.class)
@Transactional
public class ClubRepositoryTest {

    @Autowired
    private ClubRepository clubRepository;

    @Test
    @DisplayName("Should find club by name")
    public void testFindByName() {
        // Arrange
        Club club = new Club();
        club.setName("Coding Club"); // Match the entity field (name)
        club.setDescription("A club for coders");
        clubRepository.save(club);

        // Act
        Optional<Club> foundClub = clubRepository.findByName("Coding Club"); // This should match your repository method

        // Assert
        assertThat(foundClub).isPresent();
        assertThat(foundClub.get().getDescription()).isEqualTo("A club for coders");
    }
}
