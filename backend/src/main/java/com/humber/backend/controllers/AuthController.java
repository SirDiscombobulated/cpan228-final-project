package com.humber.backend.controllers;

import com.humber.backend.models.Item;
import com.humber.backend.models.MyUser;
import com.humber.backend.services.ItemService;
import com.humber.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final ItemService itemService;
    private final UserService userService;
    public AuthController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
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
                return ResponseEntity.badRequest().body("Error: Title must be non-empty!");
            }
            if (statusCode == -2) {
                return ResponseEntity.badRequest().body("Error: Category must be non-empty!");
            }
            if (statusCode == -3) {
                return ResponseEntity.badRequest().body("Error: Price must be greater than zero!");
            }
            if (statusCode == -4) {
                return ResponseEntity.badRequest().body("Error: Description must be non-empty!");
            }
            if (statusCode == -5) {
                return ResponseEntity.badRequest().body("Error: Must select a Date!");
            }
        } catch(IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
        return ResponseEntity.ok(item.getId());
    }

    //search items with a key phrase within title
    @GetMapping("/items/filter/{keyword}")
    public ResponseEntity<List<Item>> getFilteredItems(@PathVariable String keyword) {
        return ResponseEntity.ok(itemService.getFilteredItems("Available", keyword));
    }

    //featured items
    @GetMapping("/items/featured")
    public ResponseEntity<List<Item>> getFeaturedItems() {
        return ResponseEntity.ok(itemService.getTopInterestedItems());
    }

    //get all items belonging to a username
    @GetMapping("/items/owner/{username}")
    public ResponseEntity<List<Item>> getOwnerItems(@PathVariable String username) {
        return ResponseEntity.ok(itemService.getOwnerItems(username));
    }

    // append item to wishlist (and interested)
    @PutMapping("/wishlist/add/{username}/{itemId}")
    public ResponseEntity<String> addWishlist(@PathVariable("username") String username, @PathVariable("itemId") String itemId) {
        int statusCode = userService.addToWishlist(username, itemId);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username not found");
        } if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error! Item not found");
        }
        return ResponseEntity.ok("Success! Added to wishlist and interested!");
    }

    // remove item from wishlist (and interested)
    @PutMapping("/wishlist/remove/{username}/{itemId}")
    public ResponseEntity<String> removeWishlist(@PathVariable("username") String username, @PathVariable("itemId") String itemId) {
        int statusCode = userService.removeFromWishlist(username, itemId);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username not found");
        } if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error! Item not found");
        }
        return ResponseEntity.ok("Success! Removed from wishlist and interested!");
    }

    //update item
    @PutMapping("/items/{username}/{id}")
    public ResponseEntity<String> updateItem(@PathVariable String username, @PathVariable String id, @RequestBody Item item) {
        int statusCode = itemService.updateItem(username, id, item);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error: Item does not exist!");
        } else if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error: User does not own item!");
        }
        return ResponseEntity.ok("Item updated successfully!");
    }

    // get user by username
    @GetMapping("/users/{username}")
    public MyUser getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
    }

    // update user by username
    @PutMapping("/users/{username}")
    public ResponseEntity<String> updateUser(@RequestBody() MyUser user, @PathVariable String username) {
        int statusCode = userService.updateUser(user, username);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Username cannot be found");
        }
        return ResponseEntity.ok("Success! User has been updated!");
    }

    //delete an item
    @DeleteMapping("/items/{username}/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable String username, @PathVariable String id) {
        int statusCode = userService.deleteByItemId(username, id);
        if (statusCode == -1) {
            return ResponseEntity.badRequest().body("Error! Item not found!");
        } else if (statusCode == -2) {
            return ResponseEntity.badRequest().body("Error! User does not own item!");
        }
        return ResponseEntity.ok("Success! Item deleted successfully!");
    }
}
