package com.humber.backend.controllers;

import com.humber.backend.models.MyUser;
import com.humber.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController implements org.springframework.boot.web.servlet.error.ErrorController {

    private final UserService userService;

    @Value("${STORE_NAME}")
    private String storeName;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Custom error endpoint
    @GetMapping("/error")
    public String handleError() {
        return "auth/error";
    }

    // Custom login endpoint
    @GetMapping("/login")
    public String login(Model model,
                        @RequestParam(required = false) String success,
                        @RequestParam(required = false) String fail) {
        model.addAttribute(success != null ? "success" : "fail", success != null ? success : fail);
        model.addAttribute("storeName", storeName);
        return "auth/login";
    }

    // Custom logout endpoint
    @GetMapping("/logout")
    public String customLogout(HttpServletRequest req, HttpServletResponse res, Authentication auth) {
        // Perform the logout logic
        new SecurityContextLogoutHandler().logout(req, res, auth);
        return "redirect:/login?success=You have been logged out!";
    }

    @GetMapping("/register")
    public String register(Model model, @RequestParam(required = false) String message) {
        model.addAttribute("message", message);
        model.addAttribute("user", new MyUser());
        return "auth/register";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute("user") MyUser user) {
        int saveUserCode = userService.saveUser(user);
        if (saveUserCode == 0) {
            return "redirect:/error";
        } else {
            return "redirect:/login?success=Registration successful!";
        }
    }
}
