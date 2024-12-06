package com.humber.FinalProjectCPAN228.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class MyUser {
    @Id
    private String id;
    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private int phoneNumber;
    private String email;
    private String bio;
    private List<String> wishlist;
}
