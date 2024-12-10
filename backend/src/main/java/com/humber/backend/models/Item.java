package com.humber.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data //automatically generates common methods for the class (i.e., getters, setters, toString(), equals(), hashCode())
@NoArgsConstructor //automatically generates a no-argument constructor for this class
@AllArgsConstructor //automatically generates a constructor with one parameter for each field of this class
@Document(collection = "items") //marks this class as a MongoDB document
public class Item {
    @Id
    private String id;
    private String title;
    private String category;
    private double price;
    private String description;
    private LocalDateTime createdAt;
    private String status;
    private String ownerId;
    private List<String> interested;
}
