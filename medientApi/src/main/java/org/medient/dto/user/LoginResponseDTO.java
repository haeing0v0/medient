package org.medient.dto.user;

import lombok.Data;

@Data
public class LoginResponseDTO {
    private Long userNo;
    private String userId;
    private String userName;
    private Integer age;
    private String gender;
    private Boolean isPregnant;
}