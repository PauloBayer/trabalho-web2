package com.web2.healboard.services;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.models.user.User;
import com.web2.healboard.repositories.SolicitacaoManutencaoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    public SolicitacaoManutencao obterSolicitacaoPorId(UUID id) {
        return solicitacaoManutencaoRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Solicitação não encontrada")
        );
    }

    public SolicitacaoManutencao obterSolicitacaoPorIdEUser(UUID id, User user) {
        return solicitacaoManutencaoRepository.findByIdAndClienteId(id, user.getId()).orElseThrow(
                () -> new IllegalArgumentException("Solicitação não encontrada")
        );
    }

    public void atualizarSolicitacao(UUID id, SolicitacaoManutencao novaSolicitacao, User user) {
        SolicitacaoManutencao solicitacaoExistente = obterSolicitacaoPorId(id);

        if (!Objects.equals(solicitacaoExistente.getCliente().getId(), user.getId()))
            throw new AccessDeniedException("Solicitação não encontrada");

        solicitacaoExistente.setDescricaoEquipamento(novaSolicitacao.getDescricaoEquipamento());
        solicitacaoExistente.setCategoriaEquipamento(novaSolicitacao.getCategoriaEquipamento());
        solicitacaoExistente.setDescricaoDefeito(novaSolicitacao.getDescricaoDefeito());

        this.solicitacaoManutencaoRepository.save(solicitacaoExistente);
    }

    public void excluirSolicitacao(UUID id, User user) {
        SolicitacaoManutencao solicitacao = this.obterSolicitacaoPorId(id);

        if (!Objects.equals(solicitacao.getCliente().getId(), user.getId()))
            throw new AccessDeniedException("Solicitação não encontrada");

        this.solicitacaoManutencaoRepository.delete(solicitacao);
    }

    public List<SolicitacaoManutencao> obterSolicitacoesPorClienteId(Long clienteId) {
        return solicitacaoManutencaoRepository.findByClienteId(clienteId);
    }
}
