package com.web2.healboard.services;

import com.web2.healboard.exceptions.CpfJaRegistradoException;
import com.web2.healboard.exceptions.CredenciaisInvalidasException;
import com.web2.healboard.exceptions.EmailJaRegistradoException;
import com.web2.healboard.exceptions.SenhaInvalidaException;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.repositories.ClienteRepository;
import com.web2.healboard.repositories.FuncionarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@RequiredArgsConstructor
@Service
public class ClienteService {

    private final FuncionarioRepository funcionarioRepository;
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public Cliente findByEmail(String username) {
        return this.clienteRepository.findByEmail(username).orElseThrow(
                () -> new EntityNotFoundException("usuario não encontrado")
        );
    }

    @Transactional(readOnly = true)
    public Cliente findByEmailAndSenha(String email, String password) {
        Cliente cliente = this.findByEmail(email);
        if (!this.passwordEncoder.matches(password, cliente.getSenha()))
            throw new CredenciaisInvalidasException("credenciais inválidas");
        return cliente;
    }

    public Cliente createCliente(Cliente cliente) {
        if (this.funcionarioRepository.existsByEmail(cliente.getEmail())
                || this.clienteRepository.existsByEmail(cliente.getEmail()))
            throw new EmailJaRegistradoException("o email já está sendo usado");

        if (this.clienteRepository.existsByCpf(cliente.getCpf()))
            throw new CpfJaRegistradoException("o CPF já está sendo usado");

        String senha = String.format("%04d", new Random().nextInt(10000));
        cliente.setSenha(this.passwordEncoder.encode(senha));

        this.emailService.sendEmail(cliente.getEmail(), "Cadastro na plataforma HealBoard", senha);

        return clienteRepository.save(cliente);
    }
}
