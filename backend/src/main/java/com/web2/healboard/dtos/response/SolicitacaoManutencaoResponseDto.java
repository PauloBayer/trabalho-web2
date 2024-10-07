package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class SolicitacaoManutencaoResponseDto {
    private UUID id;
    private String descricaoEquipamento;
    private String categoriaEquipamento;
    private String descricaoDefeito;
    private String dataHora;
    private String status;
}
