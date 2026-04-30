package org.medient.service;

import org.medient.dto.user.LoginResponseDTO;
import org.medient.dto.user.UserDTO;
import org.medient.mapper.UserMapper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public void signup(UserDTO user) {
        userMapper.insertUser(user);
    }
    
    public LoginResponseDTO loginUser(UserDTO user) {
        UserDTO result = userMapper.loginUser(user);

        if (result == null) {
            return null;
        }

        LoginResponseDTO response = new LoginResponseDTO();
        response.setId(result.getId());
        response.setUserId(result.getUserId());
        response.setUserName(result.getUserName());
        response.setAge(result.getAge());
        response.setGender(result.getGender());
        response.setIsPregnant(result.getIsPregnant());

        return response;
    }
}