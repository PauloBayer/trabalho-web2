package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.CategoriaEquipamentoMapper;
import com.web2.healboard.dtos.mapper.SolicitacaoManutencaoMapper;
import com.web2.healboard.dtos.request.CategoriaEquipamentoRequestDto;
import com.web2.healboard.dtos.response.CategoriaEquipamentoResponseDto;
import com.web2.healboard.exceptions.NaoAutorizadoException;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.services.CategoriaEquipamentoService;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/categorias-equipamento")
public class CategoriaEquipamentoController {

    private final UserService userService;
    private final CategoriaEquipamentoService categoriaEquipamentoService;

    @GetMapping
    public ResponseEntity<List<CategoriaEquipamentoResponseDto>> listarCategorias() {
        List<CategoriaEquipamento> categorias = this.categoriaEquipamentoService.listarCategorias();
        return ResponseEntity.ok(categorias.stream().map(CategoriaEquipamentoMapper::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaEquipamentoResponseDto> obterCategoria(@PathVariable Long id) {
        CategoriaEquipamento categoriaEquipamento = this.categoriaEquipamentoService.obterCategoriaPorId(id);
        return ResponseEntity.ok(CategoriaEquipamentoMapper.toDto(categoriaEquipamento));
    }

    @PostMapping
    public ResponseEntity<Void> criarCategoria(
            @RequestBody @Valid CategoriaEquipamentoRequestDto requestDto,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario funcionario))
            throw new NaoAutorizadoException("não autorizado");

        CategoriaEquipamento novaCategoria = this.categoriaEquipamentoService.criarCategoria(
                CategoriaEquipamentoMapper.toModel(requestDto)
        );

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(novaCategoria.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarCategoria(
        @PathVariable Long id,
        @RequestBody @Valid CategoriaEquipamentoRequestDto categoria,
        Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario funcionario))
            throw new NaoAutorizadoException("não autorizado");

        CategoriaEquipamento categoriaAtualizada = this.categoriaEquipamentoService.atualizarCategoria(
                id, CategoriaEquipamentoMapper.toModel(categoria)
        );
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(categoriaAtualizada.getId()).toUri();

        return ResponseEntity.ok().location(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removerCategoria(
            @PathVariable Long id,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario funcionario))
            throw new NaoAutorizadoException("não autorizado");

        this.categoriaEquipamentoService.removerCategoria(id);
        return ResponseEntity.noContent().build();
    }
}
