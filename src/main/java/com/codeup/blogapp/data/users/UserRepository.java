package com.codeup.blogapp.data.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);
    Optional<User> findByEmail(String email);

}
