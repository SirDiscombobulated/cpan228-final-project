package com.humber.backend.controllers;

import com.humber.backend.models.Item;
import com.humber.backend.services.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/store/api")
public class RestController {

    //dependency injection
    private final ItemService itemService;

    public RestController(ItemService itemService) {
        this.itemService = itemService;
    }

    //get all items
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    //get item by id
    @GetMapping("/items/{id}")
    public ResponseEntity<Optional<Item>> getItemById(@PathVariable String id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    //save item
    @PostMapping("/items")
    public ResponseEntity<String> addItem(@RequestBody Item item) {
        try {
            itemService.saveItem(item);
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok("Item added successfully!");
    }

    //delete item
    @DeleteMapping("items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteById(id);
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok("Item deleted successfully!");

    }

    //update item
    @PutMapping("items/{id}")
    public ResponseEntity<String> updateItem(@PathVariable String id, @RequestBody Item item) {
        try {
            itemService.updateItem(item);
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok("Dish updated successfully!");
    }
}
