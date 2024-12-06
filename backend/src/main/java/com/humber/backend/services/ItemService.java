package com.humber.backend.services;

import com.humber.backend.models.Item;
import com.humber.backend.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // Get all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Save an item
    public int saveItem(Item item) {
        if (item.getPrice() >= 0) {
            itemRepository.save(item);
            return 1; // Success
        }
        return -1; // Error: price too low
    }

    // Find by category and price
    public List<Item> getFilteredItems(String category, Double price) {
        return itemRepository.findByIgnoreCaseCategoryAndPrice(category, price);
    }

    // Delete an item by ID
    public int deleteById(String id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return 1; // Success
        }
        return -1; // Failure: item not found
    }

    // Update an item
    public void updateItem(Item item) {
        itemRepository.save(item);
    }

    // Get an item by ID
    public Optional<Item> getItemById(String id) {
        return itemRepository.findById(id);
    }

    // Paginate records
    public Page<Item> getPaginatedItems(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return itemRepository.findAll(pageable);
    }
}
