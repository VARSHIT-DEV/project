package com.example;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository = new UserRepository();

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        try {
            userRepository.registerUser(user);
            return "User registered successfully!";
        } catch (Exception e) {
            return "Error registering user: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        try {
            User loggedInUser = userRepository.loginUser(user.getUsername(), user.getPassword());
            if (loggedInUser != null) {
                return "Login successful!";
            } else {
                return "Invalid username or password.";
            }
        } catch (Exception e) {
            return "Error logging in: " + e.getMessage();
        }
    }
}
