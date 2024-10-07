package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.FuncionarioMapper;
import com.web2.healboard.dtos.mapper.SolicitacaoManutencaoMapper;
import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.dtos.response.SolicitacaoManutencaoResponseDto;
import com.web2.healboard.exceptions.NaoAutorizadoException;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.services.SolicitacaoManutencaoService;
import com.web2.healboard.services.ClienteService;
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

    private final UserService userService;
    private final SolicitacaoManutencaoService solicitacaoManutencaoService;
    private final ClienteService clienteService;

    @PostMapping("/manutencao")
    public ResponseEntity<Void> solicitacaoManutencao(
            @RequestBody @Valid SolicitacaoManutencaoRequestDto dto,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Cliente cliente))
            throw new NaoAutorizadoException("não autorizado");

        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        this.solicitacaoManutencaoService.registrarSolicitacao(solicitacao, cliente);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarSolicitacao(
            @PathVariable UUID id,
            @RequestBody @Valid SolicitacaoManutencaoRequestDto dto,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Cliente cliente))
            throw new NaoAutorizadoException("não autorizado");

        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        this.solicitacaoManutencaoService.atualizarSolicitacao(id, solicitacao, cliente);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirSolicitacao(
            @PathVariable UUID id,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Cliente cliente))
            throw new NaoAutorizadoException("não autorizado");

        this.solicitacaoManutencaoService.excluirSolicitacao(id, cliente);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public ResponseEntity<List<SolicitacaoManutencaoResponseDto>> obterSolicitacoesDoClienteAutenticado(
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Cliente cliente))
            throw new NaoAutorizadoException("não autorizado");

        List<SolicitacaoManutencao> solicitacoes = this.solicitacaoManutencaoService.obterSolicitacoesPorClienteId(cliente.getId());
        return ResponseEntity.ok(solicitacoes.stream().map(SolicitacaoManutencaoMapper::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoManutencaoResponseDto> obterSolicitacaoPorId(
            @PathVariable UUID id,
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());

        if (user instanceof Cliente cliente) {
            SolicitacaoManutencao solicitacao = this.solicitacaoManutencaoService.obterSolicitacaoPorIdEUser(id, cliente);
            return ResponseEntity.ok(SolicitacaoManutencaoMapper.toDto(solicitacao));
        }

        if (user instanceof Funcionario) {
            SolicitacaoManutencao solicitacao = this.solicitacaoManutencaoService.obterSolicitacaoPorId(id);
            return ResponseEntity.ok(SolicitacaoManutencaoMapper.toDto(solicitacao));
        }

        throw new NaoAutorizadoException("não autorizado");
    }

    @GetMapping
    public ResponseEntity<List<SolicitacaoManutencaoResponseDto>> findAllSolicitacoes(
            Principal principal
    ) {
        Object user = this.userService.findByEmail(principal.getName());
        if (!(user instanceof Funcionario funcionario))
            throw new NaoAutorizadoException("não autorizado");

        List<SolicitacaoManutencao> solicitacoes = this.solicitacaoManutencaoService.findAll();
        return ResponseEntity.ok(solicitacoes.stream().map(SolicitacaoManutencaoMapper::toDto).collect(Collectors.toList()));
    }
}
