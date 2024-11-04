package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EfetuarOrcamentoRequestDto {
    @NotNull(message = "Valor orçado é obrigatório")
    private Float valorOrcado;
}

