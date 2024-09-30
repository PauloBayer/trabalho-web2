package com.web2.healboard.repositories;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SolicitacaoManutencaoRepository extends JpaRepository<SolicitacaoManutencao, Long> {
    Optional<SolicitacaoManutencao> findByDescricaoEquipamento(String descricaoEquipamento);
}
