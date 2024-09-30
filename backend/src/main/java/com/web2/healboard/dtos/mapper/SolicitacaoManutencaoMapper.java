package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;

public class SolicitacaoManutencaoMapper {

    public static SolicitacaoManutencao toSolicitacao(SolicitacaoManutencaoRequestDto dto) {
        SolicitacaoManutencao solicitacao = new SolicitacaoManutencao();
        solicitacao.setDescricaoEquipamento(dto.getDescricaoEquipamento());
        solicitacao.setCategoriaEquipamento(dto.getCategoriaEquipamento());
        solicitacao.setDescricaoDefeito(dto.getDescricaoDefeito());
        return solicitacao;
    }
}
