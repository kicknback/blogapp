package com.codeup.blogapp.web;

import com.codeup.blogapp.data.posts.Post;
import com.codeup.blogapp.data.posts.PostsRepository;
import com.codeup.blogapp.data.users.User;
import com.codeup.blogapp.data.users.UserRepository;
import com.codeup.blogapp.services.EmailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostsController {

    // private ArrayList<Post> posts;
    private final PostsRepository postsRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;

    public PostsController(PostsRepository postsRepository, EmailService emailService, UserRepository userRepository) {
        this.postsRepository = postsRepository;
        this.emailService = emailService;
        this.userRepository = userRepository;
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
    private void createPost(@RequestBody Post newPost, OAuth2Authentication auth) {
        System.out.println(newPost.getTitle());
        System.out.println(newPost.getContent());
        String email = auth.getName();
        User user = userRepository.findByEmail(email).get();
        newPost.setUser(user);
        postsRepository.save(newPost);
        emailService.prepareAndSend(newPost, "This is a test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
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
