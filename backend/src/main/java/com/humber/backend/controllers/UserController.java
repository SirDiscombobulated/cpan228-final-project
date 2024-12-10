package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<MyUser> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user/{id}")
    public MyUser getUser(@PathVariable("id") String id) {
        return userService.getUser(id);
    }

    @PutMapping("/user/{id}")
    public MyUser updateUser(@RequestBody() MyUser user, @PathVariable String id) {
        return userService.updateUser(user);
    }

    @PostMapping("/register")
    public ResponseEntity<MyUser> register(@RequestBody() MyUser user) {
        MyUser newUser = userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
    }
}
