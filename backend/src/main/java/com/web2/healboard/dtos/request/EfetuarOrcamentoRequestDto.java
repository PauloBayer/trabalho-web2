package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EfetuarOrcamentoRequestDto {
    @NotNull(message = "Valor orçado é obrigatório")
    private Float valorOrcado;

    @NotBlank(message = "Orientações extras do orçamento é obrigatório")
    @Size(min = 2, message = "Orientações extras do orçamento deve ter no mínimo 2 caracteres")
    private String orientacoesExtras;
}
