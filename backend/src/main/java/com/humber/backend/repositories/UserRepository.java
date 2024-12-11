package com.humber.backend.repositories;

import com.humber.backend.models.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<MyUser, String> {
    Optional<MyUser> findByUsername(String username);
}