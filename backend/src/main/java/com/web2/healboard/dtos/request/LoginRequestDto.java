package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginRequestDto {
    @NotEmpty(message = "email must not be empty")
    private String email;
    @NotEmpty(message = "senha must not be empty")
    private String senha;
}
