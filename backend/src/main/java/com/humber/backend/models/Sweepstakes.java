package com.humber.backend.models;

import org.springframework.data.annotation.Id; // Correct import for MongoDB
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sweepstakes")
public class Sweepstakes {
    @Id
    private String id;
    private String itemId;
    private boolean isActive;
    private LocalDateTime expirationDate;
    private List<String> entries;
}
