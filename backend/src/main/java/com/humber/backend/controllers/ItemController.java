package com.humber.backend.controllers;

import com.humber.backend.models.Item;
import com.humber.backend.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/store") //base path
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @Value("${STORE_NAME}")
    private String storeName;

    @Value("${PAGE_SIZE}")
    private int pageSize;

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("rName", storeName);
        String logoPath = "static/css/images/logo2.PNG";
        model.addAttribute("logoPath", logoPath);
        return "home";
    }

    @GetMapping("/index/{pageNo}")
    public String menu(Model model,
                       @RequestParam(required = false) String searchedCategory,
                       @RequestParam(required = false) Double searchedPrice,
                       @RequestParam(required = false) String success,
                       @RequestParam(required = false) String fail,
                       @PathVariable int pageNo,
                       @RequestParam(required = false, defaultValue = "id") String sortField,
                       @RequestParam(required = false, defaultValue = "asc") String sortDirection) {
        // Handle filtering logic
        if (searchedCategory != null && searchedPrice != null) {
            List<Item> filteredItems = itemService.getFilteredItems(searchedCategory, searchedPrice);
            model.addAttribute("items", filteredItems);
            model.addAttribute(!filteredItems.isEmpty() ? "success" : "fail",
                    !filteredItems.isEmpty() ? "Success! Items have been filtered!" : "No records found.");
        } else {
            // Add success or failure messages
            model.addAttribute(success != null ? "success" : "fail", success != null ? success : fail);

            // Add pagination data
            Page<Item> page = itemService.getPaginatedItems(pageNo, pageSize, sortField, sortDirection);

            model.addAttribute("items", page.getContent());
            model.addAttribute("totalPages", page.getTotalPages());
            model.addAttribute("currentPage", pageNo);
            model.addAttribute("totalItems", page.getTotalElements());

            // Add sorting details
            model.addAttribute("sortField", sortField);
            model.addAttribute("sortDirection", sortDirection);
            model.addAttribute("reverseSortDirection", sortDirection.equals("asc") ? "desc" : "asc");
        }
        return "index";
    }
}