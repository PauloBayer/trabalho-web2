package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoriaEquipamentoRequestDto {

    @NotBlank(message = "Nome da categoria must not be blank")
    private String nome;

    @NotNull(message = "Ativo é obrigatório")
    private Boolean ativo;
}
