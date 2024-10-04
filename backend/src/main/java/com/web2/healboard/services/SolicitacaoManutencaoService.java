package com.web2.healboard.services;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.user.User;
import com.web2.healboard.repositories.SolicitacaoManutencaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SolicitacaoManutencaoService {

    private final SolicitacaoManutencaoRepository solicitacaoManutencaoRepository;

    public void registrarSolicitacao(
            SolicitacaoManutencao solicitacao,
            User user
    ) {
        Optional<SolicitacaoManutencao> existente = this.solicitacaoManutencaoRepository.findByDescricaoEquipamento(
                solicitacao.getDescricaoEquipamento()
        );

        if (existente.isPresent())
            throw new IllegalArgumentException("Solicitação para esse equipamento já existe.");

        solicitacao.setCliente(user);
        this.solicitacaoManutencaoRepository.save(solicitacao);
    }

    public List<SolicitacaoManutencao> obterSolicitacoes() {
        return solicitacaoManutencaoRepository.findAll();
    }

    public SolicitacaoManutencao obterSolicitacaoPorId(UUID id) {
        return solicitacaoManutencaoRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Solicitação não encontrada"));
    }

    public void atualizarSolicitacao(UUID id, SolicitacaoManutencao novaSolicitacao) {
        SolicitacaoManutencao solicitacaoExistente = obterSolicitacaoPorId(id);
        solicitacaoExistente.setDescricaoEquipamento(novaSolicitacao.getDescricaoEquipamento());
        solicitacaoExistente.setCategoriaEquipamento(novaSolicitacao.getCategoriaEquipamento());
        solicitacaoExistente.setDescricaoDefeito(novaSolicitacao.getDescricaoDefeito());
        solicitacaoManutencaoRepository.save(solicitacaoExistente);
    }

    public void excluirSolicitacao(UUID id) {
        SolicitacaoManutencao solicitacao = obterSolicitacaoPorId(id);
        solicitacaoManutencaoRepository.delete(solicitacao);
    }

    public List<SolicitacaoManutencao> obterSolicitacoesPorClienteId(Long clienteId) {
        return solicitacaoManutencaoRepository.findByClienteId(clienteId);
    }
}
