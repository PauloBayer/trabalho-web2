package com.web2.healboard.repositories;

import com.web2.healboard.models.funcionario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Optional<Funcionario> findByEmail(String email);
    Optional<Funcionario> findByEmailAndSenha(String email, String senha);
    boolean existsByEmail(String email);
}
