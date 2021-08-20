package com.codeup.blogapp.web;

import com.codeup.blogapp.data.Category;
import com.codeup.blogapp.data.Post;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {
    
    private ArrayList<Category> categories;
    
    CategoriesController() {
        categories = new ArrayList<Category>() {{
            add(new Category(1, "Java"));
            add(new Category(2, "Javascript"));
            add(new Category(3, "HTML"));
        }};
    }

    @GetMapping
    private ArrayList<Category> getCategories() {
        return categories;
    }

    @GetMapping("/associatedposts")
    private Category getPostsByCategory(@RequestParam String categoryName) {

        Category category = null;
        for (Category tag : categories) {
            if (Objects.equals(tag.getName().toLowerCase(), categoryName.toLowerCase())) {
                category = tag;
            }
        }
        return category;

    }

}
