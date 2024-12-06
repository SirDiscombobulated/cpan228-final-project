package com.humber.backend.controllers;
import com.humber.backend.models.Item;
import com.humber.backend.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
//calling the tags from the app prop
@RequestMapping("/store/admin")
public class AdminController {

    private final ItemService itemService;

    //dependency injection
    @Autowired
    public AdminController(ItemService itemService) {
        this.itemService = itemService;
    }

    //add item page - will display a form
    @GetMapping("/add-item")
    public String addItem(Model model) {
        model.addAttribute("item", new Item());
        model.addAttribute("notUpdate", true);
        return "admin/add-item";
    }

    //save an item
    //from the backend to the frontend, we use Model
    //from the frontend to the backend, we use ModelAttribute
    @PostMapping("/add-item")
    public String saveItem(Model model, @ModelAttribute Item item) {
        int statusCode = itemService.saveItem(item);

        if (statusCode == -1) {
            model.addAttribute("error", "Error! Item cannot be sold at 0 or less!");
            model.addAttribute("notUpdate", true);
            return "admin/add-item";
        }

        return "redirect:/store/index/1?success=Item added successfully";
    }

    @GetMapping("/delete/{id}")
    public String deleteItemById(@PathVariable String id) {
        int statusCode = itemService.deleteById(id);
        if (statusCode == -1) {
            return "redirect:/store/index/1?fail=Item not found!";
        } else {
            return "redirect:/store/index/1?success=Item deleted successfully!";
        }
    }

    @GetMapping("/update/{id}")
    public String updateItem(@PathVariable String id, Model model) {
        Optional<Item> itemToUpdate = itemService.getItemById(id);
        model.addAttribute("item", itemToUpdate.orElse(null));
        model.addAttribute("notUpdate", false);
        return "admin/add-item";
    }

    @PostMapping("/update")
    public String updateItem(@ModelAttribute Item item) {
        itemService.updateItem(item);
        return "redirect:/store/index/1?success=Item update successful!";
    }
}
