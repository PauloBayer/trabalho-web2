package com.web2.healboard.dtos.mapper;

import com.web2.healboard.dtos.request.FuncionarioRequestDto;
import com.web2.healboard.dtos.response.FuncionarioResponseDto;
import com.web2.healboard.models.funcionario.Funcionario;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FuncionarioMapper {

    public static FuncionarioResponseDto toDto(Funcionario funcionario) {
        return new FuncionarioResponseDto(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getDataNascimento().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
        );
    }

    public static Funcionario toModel(FuncionarioRequestDto dto) {
        Funcionario funcionario = new Funcionario();
        funcionario.setNome(dto.getNome());
        funcionario.setEmail(dto.getEmail());
        funcionario.setDataNascimento(
                LocalDate.parse(dto.getDataNascimento(), DateTimeFormatter.ofPattern("dd/MM/yyyy"))
        );
        funcionario.setSenha(dto.getSenha());

        return funcionario;
    }
}
