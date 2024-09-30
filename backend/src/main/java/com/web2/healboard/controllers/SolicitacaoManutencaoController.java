package com.web2.healboard.controllers;

import com.web2.healboard.dtos.mapper.SolicitacaoManutencaoMapper;
import com.web2.healboard.dtos.request.SolicitacaoManutencaoRequestDto;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.services.SolicitacaoManutencaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/solicitacoes")
public class SolicitacaoManutencaoController {

    private final SolicitacaoManutencaoService service;

    @PostMapping("/manutencao")
    public ResponseEntity<Void> registrarSolicitacao(@RequestBody @Valid SolicitacaoManutencaoRequestDto dto) {
        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        service.registrarSolicitacao(solicitacao);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<SolicitacaoManutencao>> obterSolicitacoes() {
        return ResponseEntity.ok(service.obterSolicitacoes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoManutencao> obterSolicitacaoPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obterSolicitacaoPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarSolicitacao(@PathVariable Long id, @RequestBody @Valid SolicitacaoManutencaoRequestDto dto) {
        SolicitacaoManutencao solicitacao = SolicitacaoManutencaoMapper.toSolicitacao(dto);
        service.atualizarSolicitacao(id, solicitacao);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirSolicitacao(@PathVariable Long id) {
        service.excluirSolicitacao(id);
        return ResponseEntity.noContent().build();
    }
}
