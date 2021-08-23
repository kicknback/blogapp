package com.codeup.blogapp.data.category;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Category, Long> {

    // Example query

    // @Query("from posts a where a.title like %:term%")
    // List<Post> searchByTitleLike(@Param("term") String term);

}
