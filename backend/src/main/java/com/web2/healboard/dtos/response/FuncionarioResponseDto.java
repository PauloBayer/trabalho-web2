package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FuncionarioResponseDto {
    private final Long id;
    private final String nome;
    private final String email;
    private final String dataNascimento;
}
