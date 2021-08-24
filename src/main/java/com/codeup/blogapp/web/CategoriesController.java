package com.codeup.blogapp.web;

import com.codeup.blogapp.data.category.CategoriesRepository;
import com.codeup.blogapp.data.category.Category;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {

    private final CategoriesRepository categoriesRepository;

    public CategoriesController(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    
    // private ArrayList<Category> categories;
    //
    // CategoriesController() {
    //     categories = new ArrayList<Category>() {{
    //         add(new Category(1, "Java"));
    //         add(new Category(2, "Javascript"));
    //         add(new Category(3, "HTML"));
    //     }};
    // }

    @GetMapping
    private List<Category> getCategories() {
        return categoriesRepository.findAll();
    }

    // @GetMapping("/associatedposts")
    // private Category getPostsByCategory(@RequestParam String categoryName) {
    //
    //     // Category category = null;
    //     // for (Category tag : categories) {
    //     //     if (Objects.equals(tag.getName().toLowerCase(), categoryName.toLowerCase())) {
    //     //         category = tag;
    //     //     }
    //     // }
    //     // return category;
    //     return categoriesRepository.
    //
    // }

}
