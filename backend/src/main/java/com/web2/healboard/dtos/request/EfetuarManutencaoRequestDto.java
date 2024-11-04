package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EfetuarManutencaoRequestDto {
    @NotBlank(message = "Orientações da manutenção must not be blank")
    private String orientacoesManutencao;

    @NotBlank(message = "Descrição da manutenção must not be blank")
    private String descricaoManutencao;
}
