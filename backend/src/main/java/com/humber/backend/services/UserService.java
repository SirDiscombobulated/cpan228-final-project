package com.humber.backend.services;

import com.humber.backend.models.MyUser;
import com.humber.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    //get all users from repo
    public List<MyUser> getUsers() {
        return userRepository.findAll();
    }

    //get an user by username
    public MyUser getUser(String username) {
        return userRepository.findByUsername(username);
    }

    //add user (cannot use existing username)
    public int addUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return -1;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return 1;
    }

    //update an user by username
    public int updateUser(MyUser updatedUser, String username) {
        MyUser existingUser = userRepository.findByUsername(username);
        if (existingUser == null) {
            return -1;
        }
        if (!updatedUser.getUsername().isEmpty()) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (!updatedUser.getFirstName().isEmpty()) {
            existingUser.setFirstName(updatedUser.getFirstName());
        }
        if (!updatedUser.getLastName().isEmpty()) {
            existingUser.setLastName(updatedUser.getLastName());
        }
        if (!updatedUser.getEmail().isEmpty()) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (!updatedUser.getBio().isEmpty()) {
            existingUser.setBio(updatedUser.getBio());
        }
        if (!updatedUser.getRole().isEmpty()) {
            existingUser.setRole(updatedUser.getRole());
        }
        if (updatedUser.getPhoneNumber() != 0) {
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        }
        if (updatedUser.getWishlist() != null && !updatedUser.getWishlist().isEmpty()) {
            existingUser.setWishlist(updatedUser.getWishlist());
        }
        userRepository.save(existingUser);
        return 1;
    }

    //delete user
    public int deleteUser(String username) {
        MyUser deletedUser = userRepository.findByUsername(username);
        if (userRepository.findByUsername(username) == null) {
            return -1;
        }
        userRepository.deleteById(deletedUser.getId());
        return 1;
    }

    //authenticate user
    public boolean authenticate(String username, String password) {
        MyUser user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}