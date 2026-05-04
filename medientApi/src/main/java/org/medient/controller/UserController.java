package org.medient.controller;

import org.medient.dto.user.LoginResponseDTO;
import org.medient.dto.user.UserDTO;
import org.medient.service.UserService;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody UserDTO userDTO) {
        userService.signup(userDTO);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody UserDTO userDTO) {
        return userService.loginUser(userDTO);
    }

    @PostMapping("/logout")
    public String logout() {
        return "로그아웃 성공";
    }
}