package com.codeup.blogapp.web;

import com.codeup.blogapp.data.posts.Post;
import com.codeup.blogapp.data.users.User;
import com.codeup.blogapp.data.users.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.*;

@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UsersController {

    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping
    private List<User> getUsers() { return userRepository.findAll(); }

    @GetMapping("/{id}")
    private User findById(@PathVariable Long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("/findByUsername")
    private User findByUsername(@RequestParam String username) {
        return userRepository.findUserByUsername(username);
    }

    @GetMapping("/findByEmail")
    private User findByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email).get();
    }

    @PostMapping
    private void createUser(@RequestBody User user) {
        System.out.println(user.getUsername());
        System.out.println(user.getEmail());
        userRepository.save(user);
    }

    @PutMapping("/{id}")
    private void updateUser(@PathVariable Long id, @RequestBody User user) {
        System.out.println(user.getId());
        System.out.println(user.getRole());
        System.out.println(user.getEmail());

        // Need to make sure user exists first
        userRepository.save(user);
    }

    @PutMapping("/{id}/updatePassword")
    private void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {

    }

    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        System.out.printf("User %s was deleted.", id);
    }

}
