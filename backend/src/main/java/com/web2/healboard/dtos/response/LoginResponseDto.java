package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginResponseDto {
    private String token;
    private String role;
    private Object user;
}
