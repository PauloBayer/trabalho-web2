package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.dtos.response.SolicitacaoManutencaoResponseDto;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;

import java.time.format.DateTimeFormatter;

public class SolicitacaoManutencaoMapper {

    public static SolicitacaoManutencao toSolicitacao(SolicitacaoManutencaoRequestDto dto) {
        SolicitacaoManutencao solicitacao = new SolicitacaoManutencao();
        solicitacao.setDescricaoEquipamento(dto.getDescricaoEquipamento());
        solicitacao.setCategoriaEquipamento(dto.getCategoriaEquipamento());
        solicitacao.setDescricaoDefeito(dto.getDescricaoDefeito());
        return solicitacao;
    }

    public static SolicitacaoManutencaoResponseDto toDto(SolicitacaoManutencao model) {
        return new SolicitacaoManutencaoResponseDto(
                model.getId(),
                model.getDescricaoEquipamento(),
                model.getCategoriaEquipamento(),
                model.getDescricaoDefeito(),
                model.getDataHora().format(DateTimeFormatter.ISO_DATE_TIME),
                model.getStatus().toString()
        );
    }
}
