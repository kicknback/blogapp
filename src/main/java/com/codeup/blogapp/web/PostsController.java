package com.codeup.blogapp.web;

import com.codeup.blogapp.data.category.Category;
import com.codeup.blogapp.data.posts.Post;
import com.codeup.blogapp.data.posts.PostsRepository;
import com.codeup.blogapp.data.users.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    // private ArrayList<Post> posts;
    private final PostsRepository postsRepository;

    public PostsController(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }


    @GetMapping
    private List<Post> getPosts() {
        return postsRepository.findAll();
    }

    @GetMapping("{id}")
    private Post getPostById(@PathVariable Long id) {
        try {
            return postsRepository.findById(id).get();

        } catch (Exception e) {
            // @ExceptionHandler(value = )
            System.out.println(e.getMessage());
        }
        return null;
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        System.out.println(newPost.getTitle());
        System.out.println(newPost.getContent());
        postsRepository.save(newPost);
    }

    @PutMapping("/{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        System.out.println(post.getId());
        System.out.println(post.getTitle());
        System.out.println(post.getContent());

        // Need to make sure post exists first
        // Post existingPost = postsRepository.getById(id);

        postsRepository.save(post);
    }

    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable Long id) {
        System.out.printf("Movie %s was deleted.", id);
        postsRepository.deleteById(id);
    }

}
