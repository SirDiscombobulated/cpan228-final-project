package com.humber.backend.repositories;

import com.humber.backend.models.MyUser;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<MyUser, String> {

    //get optional user by username
    public Optional<MyUser> findByUsername(String username);
}
