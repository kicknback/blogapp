package com.codeup.blogapp.web;

import com.codeup.blogapp.data.Post;
import com.codeup.blogapp.data.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/api/users", headers = "Accept=application/json", produces = "application/json")
public class UsersController {

    private ArrayList<User> users;

    UsersController() {

        users = new ArrayList<User>() {{
            add(new User(1, "JoBo", "jobo@gmail.com", "jobojobo"));
            add(new User(2, "Danika", "danika@gmail.com", "blahblahblah"));
            add(new User(3, "Tonga", "tonga@hotmail.com", "20inva[sh20h"));
        }};

    }

    @GetMapping
    private List<User> getUsers() { return users; }

    @PostMapping
    private void createUser(@RequestBody User user) {
        int id = users.size() + 1;
        user.setId((long) id);
        users.add(user);
        System.out.println(user.getUsername());
        System.out.println(user.getEmail());
    }

    @PutMapping("/{id}")
    private void updateUser(@PathVariable Long id, @RequestBody User user) {
        System.out.println(user.getId());
        System.out.println(user.getRole());
        System.out.println(user.getEmail());
        for (User userItem : users) {
            if (Objects.equals(userItem.getId(), id)) {
                userItem.setUsername(user.getUsername());
                userItem.setEmail(user.getEmail());
            }
        }
    }

    @DeleteMapping("/{id}")
    private void deleteUser(@PathVariable Long id) {
        users.removeIf(userItem -> Objects.equals(userItem.getId(), id));
        System.out.printf("User %s was deleted.", id);
    }

}
