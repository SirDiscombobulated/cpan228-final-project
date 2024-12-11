package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    //dependency injection
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //get all users
    @GetMapping("/users")
    public List<MyUser> getUsers() {
        return userService.getUsers();
    }

    //get user by username
    @GetMapping("/users/{username}")
    public MyUser getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
    }

    //add a new user
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody() MyUser user) {
        user.setRole("USER");
        int statusCode = userService.addUser(user);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username is taken!");
        }
        return ResponseEntity.ok("Successfully registered!");
    }

    //update an user
    @PutMapping("/users")
    public ResponseEntity<String> updateUser(@RequestBody() MyUser user) {
        int statusCode = userService.updateUser(user);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Could not find user!");
        }
        return ResponseEntity.ok("Successfully updated user!");
    }

    //delete an user
    @DeleteMapping("/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
        int statusCode = userService.deleteUser(username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Could not find user!");
        }
        return ResponseEntity.ok("Successfully deleted user!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser user) {
        // Add login logic here
        boolean isAuthenticated = userService.authenticate(user.getUsername(), user.getPassword());
        if (!isAuthenticated) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        return ResponseEntity.ok("Login Successful");
    }

    @GetMapping("/login")
    public ResponseEntity<String> handleGetLogin() {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("GET method is not supported for /login");
    }
}