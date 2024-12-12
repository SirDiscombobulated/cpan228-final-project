//UserController
package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Use @RestController instead of @Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // get all users
    @GetMapping("/users")
    public List<MyUser> getUsers() {
        return userService.getUsers();
    }

    // get user by username
    @GetMapping("/user/{username}")
    public MyUser getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
    }

    // update user by username
    @PutMapping("/user/{username}")
    public ResponseEntity<String> updateUser(@RequestBody() MyUser user, @PathVariable String username) {
        int statusCode = userService.updateUser(user, username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been updated!");
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

    // delete user
    @DeleteMapping("/user/{username}")
    public void deleteUser(@PathVariable("username") String id) {
        userService.deleteUser(id);
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

    // sanity checking
    @GetMapping("/login")
    public ResponseEntity<String> handleGetLogin() {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("GET method is not supported for /login");
    }
}
