package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.CategoriaEquipamentoRequestDto;
import com.web2.healboard.dtos.response.CategoriaEquipamentoResponseDto;
import com.web2.healboard.models.categoria.CategoriaEquipamento;

public class CategoriaEquipamentoMapper {
    public static CategoriaEquipamentoResponseDto toDto(CategoriaEquipamento categoriaEquipamento) {
        CategoriaEquipamentoResponseDto dto = new CategoriaEquipamentoResponseDto();
        dto.setNome(categoriaEquipamento.getNome());
        dto.setAtivo(categoriaEquipamento.getAtivo());
        dto.setDataCriacao(categoriaEquipamento.getDataCriacao());
        dto.setDataAtualizacao(categoriaEquipamento.getDataAtualizacao());

        return dto;
    }

    public static CategoriaEquipamento toModel(CategoriaEquipamentoRequestDto dto) {
        CategoriaEquipamento categoria = new CategoriaEquipamento();
        categoria.setNome(dto.getNome());
        categoria.setAtivo(dto.getAtivo());

        return categoria;
    }
}
