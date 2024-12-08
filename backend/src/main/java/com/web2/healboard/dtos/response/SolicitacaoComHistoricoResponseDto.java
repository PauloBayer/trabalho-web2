package com.web2.healboard.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SolicitacaoComHistoricoResponseDto {
    private UUID id;
    private String categoriaEquipamento;
    private String nomeCliente;
    private String nomeFuncionario;
    private String status;
    private String dataHoraCriacao;
    private String dataHoraAtualizacao;
    private String descricaoEquipamento;
    private String descricaoDefeito;
    private Float valorOrcado;
    private String orientacoesExtrasOrcamento;
    private String motivoRejeicao;
    private String dataHoraPagamento;
    private Float valorPago;
    private String orientacoesManutencao;
    private String descricaoManutencao;
    private List<HistoricoResponseDto> historico;
}
