package com.web2.healboard.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.web2.healboard.models.categoria.CategoriaEquipamento;

public interface CategoriaEquipamentoRepository extends JpaRepository<CategoriaEquipamento, Long> {
    Optional<CategoriaEquipamento> findByNome(String nome);

    @Query("SELECT c.id FROM CategoriaEquipamento c WHERE c.nome = :categoria")
    List<Long> findIdsByNome(@Param("categoria") String categoria);
}
