package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class RefreshBearerTokenResponseDto {
    private String token;
}
