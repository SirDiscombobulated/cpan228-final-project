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

    //update an user by username (cannot change password)
    public int updateUser(MyUser user, String username) {
        MyUser myUser = userRepository.findByUsername(username);
        if (myUser == null) {
            return -1;
        }
        user.setPassword(myUser.getPassword());
        userRepository.save(user);
        return 1;
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

    //delete user
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    //authenticate user
    public boolean authenticate(String username, String password) {
        MyUser user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
    }
}
