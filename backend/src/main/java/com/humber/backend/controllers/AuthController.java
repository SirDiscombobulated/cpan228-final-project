package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
//ErrorController is no longer needed because we are sending a response body
public class AuthController {

    // dependency injection
    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // store name
    @Value("${STORE_NAME}")
    private String storeName;

    // returns a response body indicating whether the login is successful (or not) as well as the storeName
    @GetMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestParam(required = false) String message) {
        Map<String, Object> res = new HashMap<>();
        res.put("message", message);
        res.put("storeName", storeName);
        return ResponseEntity.ok(res);
    }

    // custom logout endpoint
    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> customLogout(HttpServletRequest req, HttpServletResponse res, Authentication auth) {
        new SecurityContextLogoutHandler().logout(req, res, auth);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "You have been logged out");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestParam(required = false) String message) {
        Map<String, Object> res = new HashMap<>();
        res.put("user", new MyUser());
        res.put("message", message);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody MyUser myUser) {
        int saveUserCode = userService.saveUser(myUser);
        Map<String, Object> res = new HashMap<>();
        res.put("saveUserCode", saveUserCode);
        return ResponseEntity.ok(res);
    }
}
