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
        SolicitacaoManutencaoResponseDto dto = new SolicitacaoManutencaoResponseDto();
        dto.setId(model.getId());
        dto.setCategoriaEquipamento(model.getCategoriaEquipamento());
        dto.setNomeFuncionario(
                model.getFuncionario() == null ? null : model.getFuncionario().getNome()
        );
        dto.setStatus(model.getStatus().toString());
        dto.setDataHoraCriacao(model.getDataHoraCriacao().format(DateTimeFormatter.ISO_DATE_TIME));
        dto.setDataHoraAtualizacao(model.getDataHoraAtualizacao().format(DateTimeFormatter.ISO_DATE_TIME));
        dto.setDescricaoEquipamento(model.getDescricaoEquipamento());
        dto.setDescricaoDefeito(model.getDescricaoDefeito());
        dto.setValorOrcado(model.getValorOrcado());
        dto.setMotivoRejeicao(model.getMotivoRejeicao());
        dto.setDataHoraPagamento(
                model.getDataHoraPagamento() == null ? null : model.getDataHoraPagamento().format(DateTimeFormatter.ISO_DATE_TIME)
        );
        dto.setOrientacoesManutencao(model.getOrientacoesManutencao());
        dto.setDescricaoManutencao(model.getDescricaoManutencao());

        return dto;
    }
}
