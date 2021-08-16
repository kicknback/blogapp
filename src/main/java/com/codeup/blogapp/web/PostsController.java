package com.codeup.blogapp.web;

import com.codeup.blogapp.data.Post;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    private ArrayList<Post> posts;

    PostsController() {

        posts = new ArrayList<Post>() {{
            add(new Post(1L, "A new post", "this is a brilliant post. 10/10"));
            add(new Post(2L, "A newer post", "this is a slightly brilliant post. 10/10"));
            add(new Post(3L, "A new post", "this is a supremely brilliant post. 10/10"));
        }};

    }

    @GetMapping
    private List<Post> getPosts() {
        return posts;
    }


    @PostMapping
    private void createPost(@RequestBody Post newPost) {
        int id = posts.size() + 1;
        newPost.setId((long) id);
        posts.add(newPost);
        System.out.println(newPost.getTitle());
        System.out.println(newPost.getContent());
    }

    @PutMapping("/{id}")
    private void updatePost(@PathVariable Long id, @RequestBody Post post) {
        System.out.println(post.getId());
        System.out.println(post.getTitle());
        System.out.println(post.getContent());
        for (Post postItem : posts) {
            if (Objects.equals(postItem.getId(), id)) {
                postItem.setTitle(post.getTitle());
                postItem.setContent(post.getContent());
            }
        }
    }

    @DeleteMapping("/{id}")
    private void deletePost(@PathVariable Long id) {
        posts.removeIf(postItem -> Objects.equals(postItem.getId(), id));
        System.out.printf("Movie %s was deleted.", id);
    }

}
