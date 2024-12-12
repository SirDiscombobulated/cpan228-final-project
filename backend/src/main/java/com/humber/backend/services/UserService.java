package com.humber.backend.services;

import com.humber.backend.models.Item;
import com.humber.backend.models.MyUser;
import com.humber.backend.repositories.ItemRepository;
import com.humber.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public UserService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository, ItemRepository itemRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    //authenticate user
    public boolean authenticate(String username, String password) {
        MyUser user = userRepository.findByUsername(username);
        return user != null && passwordEncoder.matches(password, user.getPassword());
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
        if (!updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
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

    //add to wishlist
    public int addToWishlist(String username, String itemId) {
        MyUser user = userRepository.findByUsername(username);
        Item item = itemRepository.findById(itemId).orElse(null);
        if (user == null) {
            return -1;
        } if (item == null) {
            return -2;
        }
        List<String> newWishlist = user.getWishlist();
        newWishlist.add(itemId);
        user.setWishlist(newWishlist);
        userRepository.save(user);
        List<String> newInterested = item.getInterested();
        newInterested.add(username);
        item.setInterested(newInterested);
        itemRepository.save(item);
        return 1;
    }

    //remove from wishlist
    public int removeFromWishlist(String username, String itemId) {
        MyUser user = userRepository.findByUsername(username);
        Item item = itemRepository.findById(itemId).orElse(null);
        if (user == null) {
            return -1;
        } if (item == null) {
            return -2;
        }
        List<String> newWishlist = user.getWishlist();
        newWishlist.remove(itemId);
        user.setWishlist(newWishlist);
        userRepository.save(user);
        List<String> newInterested = item.getInterested();
        newInterested.remove(user.getUsername());
        item.setInterested(newInterested);
        itemRepository.save(item);
        return 1;
    }

    // delete an item by ID
    public int deleteByItemId(String itemId) {
        Item deletedItem = itemRepository.findById(itemId).orElse(null);
        if(deletedItem == null) {
            return -1;
        }
        List<String> interested = deletedItem.getInterested();
        interested.forEach(username -> removeFromWishlist(username, itemId));
        itemRepository.deleteById(itemId);
        return 1;
    }

    //delete an user by username
    public int deleteUser(String username) {
        MyUser deletedUser = userRepository.findByUsername(username);
        if (deletedUser == null) {
            return -1;
        }
        List<String> wishlist = deletedUser.getWishlist();
        wishlist.forEach(itemId -> removeFromWishlist(username, itemId));
        itemRepository.deleteAll(itemRepository.findItemByOwnerId(username));
        userRepository.deleteById(deletedUser.getId());
        return 1;
    }

    //returns if user is banned or not
    public int isUserBanned(String username) {
        MyUser user = userRepository.findByUsername(username);
        if (user == null) {
            return -1;
        } if (user.getRole().equalsIgnoreCase("BANNED")) {
            return -2;
        }
        return 1;
    }

    //ban a user by username
    public int banUser(String username) {
        MyUser user = userRepository.findByUsername(username);
        if (user == null) {
            return -1;
        }
        user.setRole("BANNED");
        userRepository.save(user);
        return 1;
    }

    //unban an user by username
    public int unbanUser(String username) {
        MyUser user = userRepository.findByUsername(username);
        if (user == null) {
            return -1;
        }
        user.setRole("USER");
        userRepository.save(user);
        return 1;
    }
}
