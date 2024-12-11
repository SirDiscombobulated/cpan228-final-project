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

    public boolean authenticate(String username, String password) {
        MyUser user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }

    //returns all users in UserRepository
    public List<MyUser> getUsers() {
        return userRepository.findAll();
    }

    //returns the user corresponding to the username (if it exists)
    public MyUser getUser(String username) {
        return userRepository.findByUsername(username);
    }

    //adds the user to UserRepository
    public int addUser(MyUser user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return -1;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return 1;
    }

    //finds user by username, updates user
    public int updateUser(MyUser user) {
        MyUser newUser = userRepository.findByUsername(user.getUsername());
        if (newUser == null) {
            return -1;
        }
        newUser.setId(user.getId());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(newUser);
        return 1;
    }

    //finds user by username, deletes user
    public int deleteUser(String username) {
        MyUser user = userRepository.findByUsername(username);
        if (user == null) {
            return -1;
        }
        userRepository.deleteByUsername(username);
        return 1;
    }
}
