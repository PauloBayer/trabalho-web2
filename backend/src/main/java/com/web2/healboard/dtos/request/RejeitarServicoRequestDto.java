package com.web2.healboard.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RejeitarServicoRequestDto {
    @NotBlank(message = "Motivo da rejeição é obrigatório")
    @Size(max = 500, message = "Motivo da rejeição deve ter no máximo 500 caracteres")
    private String motivoRejeicao;
}
