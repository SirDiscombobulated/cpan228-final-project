package com.humber.backend.repositories;

import com.humber.backend.models.Item;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("mongoItemRepository") // Explicit name for MongoDB repository
// interface that provides a set of CRUD operations for MongoDB documents
public interface ItemRepository extends MongoRepository<Item, String> {
    @Aggregation(pipeline = {
            "{ '$project': { 'id': 1, 'title': 1, 'category': 1, 'price': 1, 'description': 1, 'createdAt': 1, 'status': 1, 'ownerId': 1, 'interested': 1, 'interestedCount': { $size: '$interested' } } }",
            "{ '$sort': { 'interestedCount': -1 } }",
            "{ '$limit': 8 }"})
    List<Item> findTopInterestedItems();

    List<Item> findByIgnoreCaseStatusContainingAndIgnoreCaseTitleContaining(String status, String title);

    List<Item> findItemByOwnerId(String ownerId);
}
