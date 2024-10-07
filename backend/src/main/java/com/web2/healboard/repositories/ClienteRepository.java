package com.web2.healboard.repositories;

import com.web2.healboard.models.cliente.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findByEmailAndSenha(String email, String senha);
}
