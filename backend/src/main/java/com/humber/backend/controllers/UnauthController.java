package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UnauthController {

    private final UserService userService;
    public UnauthController(UserService userService) {
        this.userService = userService;
    }

    // add user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody() MyUser user) {
        int statusCode = userService.addUser(user);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username has been taken!");
        }
        return ResponseEntity.ok("Success! You have been registered!");
    }

    // login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser user) {
        // Add login logic here
        boolean isAuthenticated = userService.authenticate(user.getUsername(), user.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    //checks if user is banned or not
    @GetMapping("/isBanned/{username}")
    public ResponseEntity<String> isBanned(@PathVariable("username") String username) {
        int statusCode = userService.isUserBanned(username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        } else if (statusCode == -2) {
            return ResponseEntity.ok("User is banned!");
        }
        return ResponseEntity.ok("User is not banned!");
    }
}
