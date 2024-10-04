package com.web2.healboard.repositories;

import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SolicitacaoManutencaoRepository extends JpaRepository<SolicitacaoManutencao, UUID> {
    Optional<SolicitacaoManutencao> findByDescricaoEquipamento(String descricaoEquipamento);
    List<SolicitacaoManutencao> findByClienteId(Long clienteId);
}
