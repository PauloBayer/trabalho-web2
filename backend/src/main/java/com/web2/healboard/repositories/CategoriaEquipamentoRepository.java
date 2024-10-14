package com.web2.healboard.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.web2.healboard.models.categoria.CategoriaEquipamento;

public interface CategoriaEquipamentoRepository extends JpaRepository<CategoriaEquipamento, Long> {
    Optional<CategoriaEquipamento> findByNome(String nome);
}
