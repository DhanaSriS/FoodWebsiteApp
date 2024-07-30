package com.example.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.models.itemModel;
import com.example.backend.models.restaurantModel;
import com.example.backend.models.restaurantmenuModel;
import com.example.backend.repositories.itemRepository;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.repositories.restaurantmenuRepository;
import com.example.backend.utils.Trie;

import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import java.util.ArrayList;
import java.util.HashMap;

// SearchService.java

@Service
public class SearchService {

    @Autowired
    private itemRepository itemRepo;

    @Autowired
    private restaurantRepository restaurantRepo;

    @Autowired
    private restaurantmenuRepository restaurantMenuRepo;

    private Trie trie; // Declare the Trie

    @PostConstruct
    public void init() {
        trie = new Trie();
        loadDataIntoTrie(); // Load data into the Trie during initialization
    }

    private void loadDataIntoTrie() {
        List<itemModel> items = StreamSupport.stream(itemRepo.findAll().spliterator(), false)
                                     .collect(Collectors.toList());

        List<restaurantModel> restaurants = StreamSupport.stream(restaurantRepo.findAll().spliterator(), false)
                                                 .collect(Collectors.toList());

        for (itemModel item : items) {
            trie.insert(item.getFoodName());
        }

        for (restaurantModel restaurant : restaurants) {
            trie.insert(restaurant.getRestName());
        }
    }

    public List<Map<String, Object>> search(String query) {
        List<Map<String, Object>> results = new ArrayList<>();

        // Get possible matches for the query prefix from the Trie
        List<String> possibleMatches = trie.startsWith(query.toLowerCase());

        for (String match : possibleMatches) {
            // Check if the match is a food item
            Optional<itemModel> itemOptional = itemRepo.findByfoodName(match);
            if (itemOptional.isPresent()) {
                itemModel item = itemOptional.get();
                List<restaurantmenuModel> menuItems = restaurantMenuRepo.findByFoodId(item.getFoodId());
                for (restaurantmenuModel menuItem : menuItems) {
                    Map<String, Object> itemDetails = buildItemDetails(item, menuItem);
                    results.add(itemDetails);
                }
            }

            // Check if the match is a restaurant name
            Optional<restaurantModel> restaurantOptional = restaurantRepo.findByRestName(match);
            if (restaurantOptional.isPresent()) {
                restaurantModel restaurant = restaurantOptional.get();
                List<restaurantmenuModel> menuItems = restaurantMenuRepo.findByRestId(restaurant.getRestId());
                for (restaurantmenuModel menuItem : menuItems) {
                    itemModel item = itemRepo.findByfoodId(menuItem.getFoodId());
                    if (item != null) {
                        Map<String, Object> itemDetails = buildItemDetails(item, menuItem);
                        results.add(itemDetails);
                    }
                }
            }
        }

        return results;
    }

    private Map<String, Object> buildItemDetails(itemModel item, restaurantmenuModel menuItem) {
        restaurantModel restaurant = restaurantRepo.findById(menuItem.getRestId()).orElse(null);

        if (restaurant == null) {
            return null;
        }

        Map<String, Object> itemDetails = new HashMap<>();
        itemDetails.put("restaurantName", restaurant.getRestName());
        itemDetails.put("foodName", item.getFoodName());
        itemDetails.put("foodPrice", menuItem.getFoodPrice());
        itemDetails.put("foodCategory", item.getFoodCategory());
        itemDetails.put("vegNonveg", item.isVegNonveg());
        itemDetails.put("restaurantId", menuItem.getRestId());

        return itemDetails;
    }
}

