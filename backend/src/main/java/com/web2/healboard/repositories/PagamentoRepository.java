package com.web2.healboard.repositories;

import com.web2.healboard.models.pagamento.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PagamentoRepository extends JpaRepository<Pagamento, UUID> {
    Optional<Pagamento> findBySolicitacaoManutencaoId(UUID solicitacaoId);

    // Updated methods for filtering
    List<Pagamento> findByCategoriaIdInAndDataHoraCriacaoBetween(List<UUID> categoriaIds, LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<Pagamento> findByCategoriaIdIn(List<UUID> categoriaIds);

    List<Pagamento> findByDataHoraCriacaoBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
}
