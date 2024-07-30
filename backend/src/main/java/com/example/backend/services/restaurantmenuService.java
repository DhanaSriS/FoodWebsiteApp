package com.example.backend.services;

import com.example.backend.models.itemModel;
import com.example.backend.models.restaurantModel;
import com.example.backend.models.restaurantmenuModel;
import com.example.backend.repositories.itemRepository;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.repositories.restaurantmenuRepository;
import com.example.backend.utils.Trie;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
import java.sql.Time;

@Service
public class restaurantmenuService {
    @Autowired
    restaurantmenuRepository restaurantmenu_Repository;
    @Autowired
    restaurantRepository restaurant_repo;
    @Autowired
    itemRepository item_repo;
    

    public boolean addMenuItem(String foodname, int preptime, double price, Long restId) {
        // Find the food ID using food name
        Long foodId = restaurantmenu_Repository.findFoodIdByName(foodname);
        if (foodId == null) {
            // Handle case where food ID is not found
            return false;
        }

        // Create a new Restaurant_menu object
        restaurantmenuModel newMenuItem = new restaurantmenuModel();
        newMenuItem.setRestId(restId);
        newMenuItem.setFoodId(foodId);
        newMenuItem.setFoodPrice(price);
        newMenuItem.setPreparationTime(Time.valueOf(String.format("%02d:00:00", preptime))); // assuming preptime is in hours

        // Save the new menu item to the repository
        restaurantmenu_Repository.save(newMenuItem);
        return true;
    }

    public void addnewMenuItem(restaurantmenuModel restaurantMenu) {
        restaurantmenu_Repository.save(restaurantMenu);
    }

    public List<String> searchRestaurantsByFoodName(String query) {
        // Get food ID from item table
        Optional<itemModel> item= item_repo.findByfoodName(query);
        Optional<restaurantModel> restaurant = restaurant_repo.findByRestName(query);

        if (item == null) {
            throw new IllegalArgumentException("Food item not found");
        }
        Long foodId = item.get().getFoodId();

        // Get menu numbers from restaurant menu table
        List<Long> menuNumbers = restaurantmenu_Repository.findByFoodId(foodId)
                .stream()
                .map(restaurantmenuModel::getMenuNumber)
                .collect(Collectors.toList());

        // Get restaurant names from restaurant table
        List<String> restaurantNames = menuNumbers.stream()
                .map(menuNumber -> restaurant_repo.findRestaurantNameByMenuNumber(menuNumber))
                .collect(Collectors.toList());

        return restaurantNames;
    }
    public List<Map<String, Object>> searchRestaurantByFoodName(String foodName) {
        // Get food item from item table
        itemModel item = item_repo.findByfoodName(foodName).orElse(null);
        if (item == null) {
            throw new IllegalArgumentException("Food item not found");
        }
        Long foodId = item.getFoodId();

        // Get menu entries from restaurant menu table
        List<restaurantmenuModel> menuEntries = restaurantmenu_Repository.findByFoodId(foodId);

        // Get detailed information for each menu entry
        return menuEntries.stream().map(menuEntry -> {
            Long restId = menuEntry.getRestId();
            restaurantModel restaurant = restaurant_repo.findByRestId(restId);

            if (restaurant != null) {
                Map<String, Object> details = new HashMap<>();
                details.put("restaurantName", restaurant.getRestName());
                details.put("foodPrice", menuEntry.getFoodPrice());
                details.put("foodCategory", item.getFoodCategory());
                details.put("vegNonveg", item.isVegNonveg() ? "Vegetarian" : "Non-Vegetarian");
                return details;
            } else {
                return null; // Handle the case where the restaurant is not found
            }
        }).filter(details -> details != null).collect(Collectors.toList());
    }

    public List<Map<String, Object>> search(String query) {
        List<restaurantmenuModel> menuItems;

        itemModel item = item_repo.findByfoodName(query).orElse(null);
        restaurantModel restaurant = restaurant_repo.findByRestName(query).orElse(null);

        if (item != null) {
            menuItems = restaurantmenu_Repository.findByFoodId(item.getFoodId());
        } else if (restaurant != null) {
            menuItems = restaurantmenu_Repository.findByRestId(restaurant.getRestId());
        } else {
            return null; // or throw an exception
        }

       
        return menuItems.stream().map(menuItem -> {
            itemModel matchedItem = item_repo.findByfoodId(menuItem.getFoodId());
            restaurantModel matchedRestaurant = restaurant_repo.findById(menuItem.getRestId()).orElse(null);

            if (matchedItem == null || matchedRestaurant == null) {
                return null; // or throw an exception
            }

            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("restaurantName", matchedRestaurant.getRestName());
            itemDetails.put("foodName", matchedItem.getFoodName());
            itemDetails.put("foodPrice", menuItem.getFoodPrice());
            itemDetails.put("foodCategory", matchedItem.getFoodCategory());
            itemDetails.put("vegNonveg", matchedItem.isVegNonveg());
            itemDetails.put("restaurantId", menuItem.getRestId());
            return itemDetails;
        }).collect(Collectors.toList());
    }

    
    public void setAvailability(Long foodid, Long restid, boolean avail){
        restaurantmenu_Repository.updateAvailability(foodid,restid,avail);
    }

    public List<restaurantmenuModel> findmenu(long restId){

        return restaurantmenu_Repository.findByRestId(restId);

    }

    
}

