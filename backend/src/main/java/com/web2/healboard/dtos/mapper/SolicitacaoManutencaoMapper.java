package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.dtos.response.HistoricoResponseDto;
import com.web2.healboard.dtos.response.SolicitacaoComHistoricoResponseDto;
import com.web2.healboard.dtos.response.SolicitacaoManutencaoResponseDto;
import com.web2.healboard.models.historico.HistoricoSolicitacao;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public static SolicitacaoComHistoricoResponseDto toDto(SolicitacaoManutencao solicitacaoManutencao, List<HistoricoSolicitacao> historicos) {
        SolicitacaoComHistoricoResponseDto responseDto = new SolicitacaoComHistoricoResponseDto();
        responseDto.setId(solicitacaoManutencao.getId());
        responseDto.setCategoriaEquipamento(solicitacaoManutencao.getCategoriaEquipamento());
        responseDto.setNomeFuncionario(
                solicitacaoManutencao.getFuncionario() == null ? null : solicitacaoManutencao.getFuncionario().getNome()
        );
        responseDto.setStatus(solicitacaoManutencao.getStatus().toString());
        responseDto.setDataHoraCriacao(solicitacaoManutencao.getDataHoraCriacao().format(DateTimeFormatter.ISO_DATE_TIME));
        responseDto.setDataHoraAtualizacao(solicitacaoManutencao.getDataHoraAtualizacao().format(DateTimeFormatter.ISO_DATE_TIME));
        responseDto.setDescricaoEquipamento(solicitacaoManutencao.getDescricaoEquipamento());
        responseDto.setDescricaoDefeito(solicitacaoManutencao.getDescricaoDefeito());
        responseDto.setValorOrcado(solicitacaoManutencao.getValorOrcado());
        responseDto.setMotivoRejeicao(solicitacaoManutencao.getMotivoRejeicao());
        responseDto.setDataHoraPagamento(
                solicitacaoManutencao.getDataHoraPagamento() == null ? null : solicitacaoManutencao.getDataHoraPagamento().format(DateTimeFormatter.ISO_DATE_TIME)
        );
        responseDto.setOrientacoesManutencao(solicitacaoManutencao.getOrientacoesManutencao());
        responseDto.setDescricaoManutencao(solicitacaoManutencao.getDescricaoManutencao());

        List<HistoricoResponseDto> historicosDto = historicos.stream()
                .map(historico -> new HistoricoResponseDto(
                        historico.getStatusAnterior() != null ? historico.getStatusAnterior().toString() : null,
                        historico.getStatusAtual().toString(),
                        historico.getDataHora().format(DateTimeFormatter.ISO_DATE_TIME),
                        historico.getDescricaoEquipamento(),
                        historico.getDescricaoDefeito(),
                        historico.getValorOrcado(),
                        historico.getMotivoRejeicao(),
                        historico.getFuncionario() != null ? historico.getFuncionario().getNome() : null,
                        historico.getFuncionarioDestino() != null ? historico.getFuncionarioDestino().getNome() : null,
                        historico.getOrientacoesManutencao(),
                        historico.getDescricaoManutencao()
                ))
                .collect(Collectors.toList());

        responseDto.setHistorico(historicosDto);
        return responseDto;
    }
}
