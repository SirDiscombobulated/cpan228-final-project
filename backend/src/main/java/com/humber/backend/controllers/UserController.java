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
    @GetMapping("/users/{username}")
    public MyUser getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
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

    // update user by username
    @PutMapping("/users/{username}")
    public ResponseEntity<String> updateUser(@RequestBody() MyUser user, @PathVariable String username) {
        int statusCode = userService.updateUser(user, username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been updated!");
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

    // append item to wishlist (and interested)
    @PutMapping("/wishlist/add/{username}/{itemId}")
    public ResponseEntity<String> addWishlist(@PathVariable("username") String username, @PathVariable("itemId") String itemId) {
        int statusCode = userService.addToWishlist(username, itemId);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username not found");
        } if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error! Item not found");
        }
        return ResponseEntity.ok("Success! Added to wishlist and interested!");
    }

    // remove item from wishlist (and interested)
    @PutMapping("/wishlist/remove/{username}/{itemId}")
    public ResponseEntity<String> removeWishlist(@PathVariable("username") String username, @PathVariable("itemId") String itemId) {
        int statusCode = userService.removeFromWishlist(username, itemId);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username not found");
        } if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error! Item not found");
        }
        return ResponseEntity.ok("Success! Removed from wishlist and interested!");
    }

    //delete an item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        int statusCode = userService.deleteByItemId(id);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Item not found");
        }
        return ResponseEntity.ok("Success! Item deleted successfully!");
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
