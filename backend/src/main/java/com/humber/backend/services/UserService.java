package com.humber.backend.services;
import com.humber.backend.models.MyUser;
import com.humber.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service //Needed to make this a bean
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //constructor injection
    @Autowired //Not necessary unless you are using multiple constructor injections
    //Intellij is smart enough to know a single constructor injection
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    //save the user to the database (i.e., registration)
    // 0 - user already exists, 1 - user saved successfully
    public int saveUser (MyUser user) {
        //check if the user exists in the database
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return 0;
        }
        //encrypt the password
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        //save the user to the database
        userRepository.save(user);
        return 1;
    }
}