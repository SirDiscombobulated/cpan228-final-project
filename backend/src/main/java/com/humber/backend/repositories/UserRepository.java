package com.humber.backend.repositories;

import com.humber.backend.models.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<MyUser, String> {

    //get user by username
    MyUser findByUsername(String username);

    //delete by username
    void deleteByUsername(String username);
}
