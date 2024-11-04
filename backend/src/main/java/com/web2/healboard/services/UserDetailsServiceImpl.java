package com.web2.healboard.services;

import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.user.UserDetailsImpl;
import com.web2.healboard.repositories.FuncionarioRepository;
import com.web2.healboard.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClienteRepository clienteRepository;
    private final FuncionarioRepository funcionarioRepository;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Cliente> optionalUser = this.clienteRepository.findByEmail(username);
        if (optionalUser.isPresent())
            return UserDetailsImpl.fromCliente(optionalUser.get());

        Optional<Funcionario> optionalFuncionario = this.funcionarioRepository.findByEmail(username);
        if (optionalFuncionario.isPresent())
            return UserDetailsImpl.fromFuncionario(optionalFuncionario.get());

        throw new UsernameNotFoundException("User com email " + username + " não encontrado.");
    }
}
