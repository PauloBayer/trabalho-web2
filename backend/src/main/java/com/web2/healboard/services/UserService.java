package com.web2.healboard.services;

import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.repositories.ClienteRepository;
import com.web2.healboard.repositories.FuncionarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final ClienteRepository clienteRepository;
    private final FuncionarioRepository funcionarioRepository;

    public Object findByEmail(String email) {
        Optional<Cliente> optionalCliente = this.clienteRepository.findByEmail(email);
        if (optionalCliente.isPresent())
            return optionalCliente.get();

        Optional<Funcionario> optionalFuncionario = this.funcionarioRepository.findByEmail(email);
        if (optionalFuncionario.isPresent())
            return optionalFuncionario.get();

        throw new EntityNotFoundException("user não encontrado");
    }

    public boolean existsByEmail(String email) {
        return this.funcionarioRepository.existsByEmail(email)
                || this.clienteRepository.existsByEmail(email);
    }
}
