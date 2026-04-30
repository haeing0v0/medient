package org.medient.controller;

import org.medient.dto.user.LoginResponseDTO;
import org.medient.dto.user.UserDTO;
import org.medient.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody UserDTO user) {
        userService.signup(user);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody UserDTO user) {
        return userService.loginUser(user);
    }
}