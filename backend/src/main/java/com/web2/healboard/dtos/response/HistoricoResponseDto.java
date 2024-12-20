package com.web2.healboard.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HistoricoResponseDto {
    private String statusAnterior;
    private String statusAtual;
    private String dataHora;
    private String descricaoEquipamento;
    private String descricaoDefeito;
    private Float valorOrcado;
    private String orientacoesExtrasOrcamento;
    private String motivoRejeicao;
    private String nomeFuncionario;
    private String nomeFuncionarioDestino;
    private String orientacoesManutencao;
    private String descricaoManutencao;
}
