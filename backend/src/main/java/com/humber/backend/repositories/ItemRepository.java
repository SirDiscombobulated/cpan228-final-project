package com.humber.backend.repositories;

import com.humber.backend.models.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("mongoItemRepository") // Explicit name for MongoDB repository
public interface ItemRepository extends MongoRepository<Item, String> {

    public List<Item> findByIgnoreCaseCategoryAndPrice(String category, Double price);
}
