package com.humber.backend.controllers;

import com.humber.backend.models.Item;
import com.humber.backend.services.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/store/api")
public class ItemController {

    //dependency injection
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    //get all items
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    //get an item by id
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable String id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    //add an item
    @PostMapping("/items")
    public ResponseEntity<String> addItem(@RequestBody Item item) {
        try {
            int statusCode = itemService.addItem(item);
            if (statusCode == -1) {
                return ResponseEntity.badRequest().body("Error: Price must be greater than 0!");
            }
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok(item.getId());
    }

    //delete an item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteById(id);
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok("Item deleted successfully!");
    }

    //update item
    @PutMapping("/items/{id}")
    public ResponseEntity<String> updateItem(@PathVariable String id, @RequestBody Item item) {
        try {
            itemService.updateItem(id, item);
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok("Item updated successfully!");
    }

    //search items with a key phrase within title
    @GetMapping("/filter/{keyword}")
    public ResponseEntity<List<Item>> getFilteredItems(@PathVariable String keyword) {
        return ResponseEntity.ok(itemService.getFilteredItems("Available", keyword));
    }

    //featured items
    @GetMapping("/featured")
    public ResponseEntity<List<Item>> getFeaturedItems() {
        return ResponseEntity.ok(itemService.getTopInterestedItems());
    }
}