package org.medient.service;

import org.medient.config.JwtUtil;
import org.medient.dto.user.LoginResponseDTO;
import org.medient.dto.user.UserDTO;
import org.medient.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signup(UserDTO user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userMapper.insertUser(user);
    }

    public LoginResponseDTO loginUser(UserDTO user) {
        UserDTO result = userMapper.findByUserId(user.getUserId());

        if (result == null) {
            return null;
        }

        if (!passwordEncoder.matches(user.getPassword(), result.getPassword())) {
            return null;
        }

        String token = jwtUtil.createToken(result.getUserNo(), result.getUserId());

        LoginResponseDTO response = new LoginResponseDTO();
        response.setUserNo(result.getUserNo());
        response.setUserId(result.getUserId());
        response.setUserName(result.getUserName());
        response.setAge(result.getAge());
        response.setGender(result.getGender());
        response.setIsPregnant(result.getIsPregnant());
        response.setToken(token);

        return response;
    }
}