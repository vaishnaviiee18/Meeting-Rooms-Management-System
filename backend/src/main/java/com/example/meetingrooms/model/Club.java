package com.example.meetingrooms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Club {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    private String logo;

    // ✅ Description field as you intended
    private String description;

    // ✅ Remove clubName if no longer needed, or retain it for backward compatibility
    // private String clubName;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    // If you want to keep clubName for some purpose, you can uncomment it
    // public String getClubName() { return clubName; }
    // public void setClubName(String clubName) { this.clubName = clubName; }
}
