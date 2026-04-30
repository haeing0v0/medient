package org.medient.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.medient.dto.user.UserDTO;

@Mapper
public interface UserMapper {
	void insertUser(UserDTO user);
	UserDTO loginUser(UserDTO user);
}
