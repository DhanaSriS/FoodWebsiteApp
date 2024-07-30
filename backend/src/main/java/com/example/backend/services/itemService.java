package com.example.backend.services;
import com.example.backend.models.itemModel;
import java.util.*;
import com.example.backend.models.restaurantModel;
import com.example.backend.models.restaurantmenuModel;
import com.example.backend.repositories.itemRepository;
import com.example.backend.repositories.restaurantRepository;
import com.example.backend.repositories.restaurantmenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class itemService {
    @Autowired
    private itemRepository item_Repository;
    private restaurantmenuRepository restaurantmenu_repo;
    private restaurantRepository restaurant_repo;

    public Iterable<itemModel> selectAll() {
        return item_Repository.findAll();
    }
    public itemModel saveItem(itemModel item_Model) {
        return item_Repository.save(item_Model);
    }

    public void deleteItem(Long id) {
        item_Repository.deleteById(id);
    }
    public itemModel findByName(String name) {
        return item_Repository.findByfoodName(name).orElse(null);
    }

    public String findById(long id){
        return item_Repository.findByfoodId(id).getFoodName();
    }
}

