package org.medient.dto.user;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String userId;
    private String password;
    private String userName;
    private Integer age;
    private String gender;
    private Boolean isPregnant;
}