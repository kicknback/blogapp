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

    User testUser = new User(4L, "testy", "testy@test.com", "testytest");

    Collection<Category> tags = new ArrayList<Category>(){{
        add(new Category(1, "Java"));
        add(new Category(2, "Javascript"));
        add(new Category(3, "HTML"));
    }};

    // PostsController() {
    //
    //     posts = new ArrayList<Post>() {{
    //         add(new Post(1L, "A new post", "this is a brilliant post. 10/10", testUser, tags));
    //         add(new Post(2L, "A newer post", "this is a slightly brilliant post. 10/10", testUser, tags));
    //         add(new Post(3L, "A new post", "this is a supremely brilliant post. 10/10", testUser, tags));
    //     }};
    //
    // }

    @GetMapping
    private List<Post> getPosts() {
        return postsRepository.findAll();
    }

    @GetMapping("/{id}")
    private Post getPostById(@PathVariable Long id) {
        return postsRepository.getById(id);
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        // int id = posts.size() + 1;
        // newPost.setId((long) id);
        // posts.add(newPost);
        System.out.println(newPost.getTitle());
        System.out.println(newPost.getContent());
        postsRepository.save(newPost);
    }

    @PutMapping("/{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        System.out.println(post.getId());
        System.out.println(post.getTitle());
        System.out.println(post.getContent());
        // for (Post postItem : posts) {
        //     if (Objects.equals(postItem.getId(), id)) {
        //         postItem.setTitle(post.getTitle());
        //         postItem.setContent(post.getContent());
        //     }
        // }

        // Need to make sure post exists first
        // Post existingPost = postsRepository.getById(id);

        postsRepository.save(post);
    }

    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable Long id) {
        // posts.removeIf(postItem -> Objects.equals(postItem.getId(), id));
        System.out.printf("Movie %s was deleted.", id);
        postsRepository.deleteById(id);
    }

}
