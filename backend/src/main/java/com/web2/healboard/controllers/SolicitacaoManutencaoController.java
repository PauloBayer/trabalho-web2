package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.SolicitacaoManutencaoMapper;
import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.dtos.response.SolicitacaoManutencaoResponseDto;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.user.User;
import com.web2.healboard.services.SolicitacaoManutencaoService;
import com.web2.healboard.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/solicitacoes")
public class SolicitacaoManutencaoController {

    private final SolicitacaoManutencaoService solicitacaoManutencaoService;
    private final UserService userService;

    @PostMapping("/manutencao")
    public ResponseEntity<Void> solicitacaoManutencao(
            @RequestBody @Valid SolicitacaoManutencaoRequestDto dto,
            Principal principal
    ) {
        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        User user = this.userService.findUserByEmail(principal.getName());
        this.solicitacaoManutencaoService.registrarSolicitacao(solicitacao, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoManutencaoResponseDto> obterSolicitacaoPorId(
            @PathVariable UUID id,
            Principal principal
    ) {
        User user = this.userService.findUserByEmail(principal.getName());
        SolicitacaoManutencao solicitacao = this.solicitacaoManutencaoService.obterSolicitacaoPorIdEUser(id, user);
        return ResponseEntity.ok(SolicitacaoManutencaoMapper.toDto(solicitacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarSolicitacao(
            @PathVariable UUID id,
            @RequestBody @Valid SolicitacaoManutencaoRequestDto dto,
            Principal principal
    ) {
        User user = this.userService.findUserByEmail(principal.getName());
        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        this.solicitacaoManutencaoService.atualizarSolicitacao(id, solicitacao, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirSolicitacao(
            @PathVariable UUID id,
            Principal principal
    ) {
        User user = this.userService.findUserByEmail(principal.getName());
        this.solicitacaoManutencaoService.excluirSolicitacao(id, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SolicitacaoManutencaoResponseDto>> obterSolicitacoesDoClienteAutenticado(
            Principal principal
    ) {
        User user = this.userService.findUserByEmail(principal.getName());
        List<SolicitacaoManutencao> solicitacoes = this.solicitacaoManutencaoService.obterSolicitacoesPorClienteId(user.getId());
        List<SolicitacaoManutencaoResponseDto> response = solicitacoes
                .stream()
                .map(SolicitacaoManutencaoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}
