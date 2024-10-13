package com.web2.healboard.repositories;

import com.web2.healboard.models.historico.HistoricoSolicitacao;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HistoricoSolicitacaoRepository extends JpaRepository<HistoricoSolicitacao, UUID> {
    List<HistoricoSolicitacao> findBySolicitacaoManutencao(SolicitacaoManutencao solicitacaoManutencao);
}
