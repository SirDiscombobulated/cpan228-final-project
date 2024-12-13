package com.humber.backend.repositories;

import com.humber.backend.models.MyUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<MyUser, String> {
    MyUser findByUsername(String username);
    List<MyUser> findAllByRoleIsNotContainingIgnoreCase(String role);
}