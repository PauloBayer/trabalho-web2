package com.web2.healboard.repositories;

import com.web2.healboard.models.pagamento.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, UUID> {
    Optional<Pagamento> findBySolicitacaoManutencaoId(UUID solicitacaoId);
}
