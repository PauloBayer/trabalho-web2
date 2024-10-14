package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SolicitacaoComHistoricoResponseDto {
    private SolicitacaoManutencaoResponseDto solicitacao;
    private List<HistoricoResponseDto> historico;
}
