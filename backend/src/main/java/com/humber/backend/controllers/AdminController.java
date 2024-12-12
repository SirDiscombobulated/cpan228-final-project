package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/")
public class AdminController {

    private final UserService userService;
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // get all users
    @GetMapping("/users")
    public List<MyUser> getUsers() {
        return userService.getUsers();
    }

    // delete user
    @DeleteMapping("/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
        int statusCode = userService.deleteUser(username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been deleted!");
    }

    //ban an user
    @PutMapping("/users/ban/{username}")
    public ResponseEntity<String> banUser(@PathVariable String username) {
        int statusCode = userService.banUser(username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been banned!");
    }

    //unban an user
    @PutMapping("/users/unban/{username}")
    public ResponseEntity<String> unbanUser(@PathVariable String username) {
        int statusCode = userService.unbanUser(username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been unbanned!");
    }
}
