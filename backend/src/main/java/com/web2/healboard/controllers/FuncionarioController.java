package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.FuncionarioMapper;
import com.web2.healboard.dtos.request.FuncionarioRequestDto;
import com.web2.healboard.dtos.response.FuncionarioResponseDto;
import com.web2.healboard.exceptions.NaoAutorizadoException;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.services.FuncionarioService;
import com.web2.healboard.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/funcionarios")
public class FuncionarioController {

    private final UserService userService;
    private final FuncionarioService funcionarioService;

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDto>> findAll(
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());

        if (!(user instanceof Funcionario))
            throw new NaoAutorizadoException("não autorizado");

        List<Funcionario> funcionarioList = this.funcionarioService.findAll();
        return ResponseEntity.ok(funcionarioList.stream().map(FuncionarioMapper::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDto> findById(
            @PathVariable Long id,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario))
            throw new NaoAutorizadoException("não autorizado");

        Funcionario funcionario = this.funcionarioService.findById(id);
        return ResponseEntity.ok(FuncionarioMapper.toDto(funcionario));
    }

    @PostMapping
    public ResponseEntity<Void> create(
            Principal principal,
            @RequestBody @Valid FuncionarioRequestDto dto
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario))
            throw new NaoAutorizadoException("não autorizado");

        Funcionario funcionario = this.funcionarioService.createFuncionario(FuncionarioMapper.toModel(dto));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(funcionario.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDto> updateById(
            @PathVariable Long id,
            Principal principal,
            @RequestBody @Valid FuncionarioRequestDto dto
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario))
            throw new NaoAutorizadoException("não autorizado");

        Funcionario funcionario = this.funcionarioService.updateFuncionario(id, FuncionarioMapper.toModel(dto));
        return ResponseEntity.ok(FuncionarioMapper.toDto(funcionario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(
            @PathVariable Long id,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario))
            throw new NaoAutorizadoException("não autorizado");

        this.funcionarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
