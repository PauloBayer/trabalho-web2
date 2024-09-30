package com.web2.healboard.dtos.request;

import lombok.AllArgsConstructor;
import jakarta.validation.constraints.*;
import lombok.Data;

@AllArgsConstructor
@Data
public class SolicitacaoManutencaoRequestDto {

    @NotBlank(message = "Descrição do equipamento é obrigatória")
    @Size(max = 255, message = "Descrição do equipamento deve ter no máximo 255 caracteres")
    private String descricaoEquipamento;

    @NotBlank(message = "Categoria do equipamento é obrigatória")
    @Size(max = 100, message = "Categoria do equipamento deve ter no máximo 100 caracteres")
    private String categoriaEquipamento;

    @NotBlank(message = "Descrição do defeito é obrigatória")
    @Size(max = 500, message = "Descrição do defeito deve ter no máximo 500 caracteres")
    private String descricaoDefeito;

    @Pattern(regexp = "^\\d{2}/\\d{2}/\\d{4}$", message = "Formato da data deve ser dd/MM/yyyy")
    private String dataDefeito;
}
