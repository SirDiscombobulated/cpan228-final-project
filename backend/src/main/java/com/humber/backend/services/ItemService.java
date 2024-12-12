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

@Service
public class ItemService {

    //dependency injection
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    // get all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // get an item by ID
    public Item getItemById(String id) {
        return itemRepository.findById(id).orElse(null);
    }

    // add an item
    public int addItem(Item item) {
        if (item.getPrice() <= 0) {
            return -1; // fail: price too low
        }
        itemRepository.save(item);
        return 1; // success
    }

    // update an item
    public int updateItem(String username, String itemId, Item item) {
        Item updatedItem = itemRepository.findById(itemId).orElse(null);
        if (updatedItem == null) {
            return -1;
        } else if (!updatedItem.getOwnerId().equals(username)) {
            return -2;
        }
        item.setId(itemId);
        itemRepository.save(item);
        return 1;
    }

    //find by status and title
    public List<Item> getFilteredItems(String status, String title) {
        return itemRepository.findByIgnoreCaseStatusContainingAndIgnoreCaseTitleContaining(status, title);
    }

    // finds the top 9 items in ItemRepository with the largest array size for interested
    public List<Item> getTopInterestedItems() {
        return itemRepository.findTopInterestedItems(); }

    // paginate records
    public Page<Item> getPaginatedItems(int pageNo, int pageSize, String sortField, String sortDirection) {
        Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() : Sort.by(sortField).descending();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return itemRepository.findAll(pageable);
    }
}