package com.web2.healboard.services;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.repositories.SolicitacaoManutencaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SolicitacaoManutencaoService {

    private final SolicitacaoManutencaoRepository repository;
    
    public SolicitacaoManutencao registrarSolicitacao(SolicitacaoManutencao solicitacao) {
        Optional<SolicitacaoManutencao> existente = repository.findByDescricaoEquipamento(solicitacao.getDescricaoEquipamento());

        if (existente.isPresent()) {
            throw new IllegalArgumentException("Solicitação para esse equipamento já existe.");
        }
        return repository.save(solicitacao);
    }

    public List<SolicitacaoManutencao> obterSolicitacoes() {
        return repository.findAll();
    }

    public SolicitacaoManutencao obterSolicitacaoPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Solicitação não encontrada"));
    }

    public void atualizarSolicitacao(Long id, SolicitacaoManutencao novaSolicitacao) {
        SolicitacaoManutencao solicitacaoExistente = obterSolicitacaoPorId(id);
        solicitacaoExistente.setDescricaoEquipamento(novaSolicitacao.getDescricaoEquipamento());
        solicitacaoExistente.setCategoriaEquipamento(novaSolicitacao.getCategoriaEquipamento());
        solicitacaoExistente.setDescricaoDefeito(novaSolicitacao.getDescricaoDefeito());
        repository.save(solicitacaoExistente);
    }

    public void excluirSolicitacao(Long id) {
        SolicitacaoManutencao solicitacao = obterSolicitacaoPorId(id);
        repository.delete(solicitacao);
    }
}
