package com.web2.healboard.services;

import com.web2.healboard.exceptions.CredenciaisInvalidasException;
import com.web2.healboard.exceptions.EmailJaRegistradoException;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.repositories.ClienteRepository;
import com.web2.healboard.repositories.FuncionarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class FuncionarioService {

    private final ClienteRepository clienteRepository;
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Funcionario findById(Long id) {
        return this.funcionarioRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("funcionario não encontrado")
        );
    }

    @Transactional(readOnly = true)
    public Funcionario findByEmail(String username) {
        return this.funcionarioRepository.findByEmail(username).orElseThrow(
                () -> new EntityNotFoundException("funcionario não encontrado")
        );
    }

    @Transactional(readOnly = true)
    public List<Funcionario> findAll() {
        return this.funcionarioRepository.findAll();
    }

    @Transactional(readOnly = false)
    public Funcionario createFuncionario(Funcionario funcionario) {
        if (this.funcionarioRepository.existsByEmail(funcionario.getEmail())
                || this.clienteRepository.existsByEmail(funcionario.getEmail()))
            throw new EmailJaRegistradoException("o email já está sendo usado");

        funcionario.setSenha(this.passwordEncoder.encode(funcionario.getSenha()));
        return this.funcionarioRepository.save(funcionario);
    }

    @Transactional(readOnly = false)
    public Funcionario updateFuncionario(Long id, Funcionario newFuncionario) {
        Funcionario oldFuncionario = this.findById(id);

        if (!Objects.equals(oldFuncionario.getEmail(), newFuncionario.getEmail())
                && (this.funcionarioRepository.existsByEmail(newFuncionario.getEmail())
                        || this.clienteRepository.existsByEmail(newFuncionario.getEmail()))
        )
            throw new EmailJaRegistradoException("o email já está sendo usado");

        oldFuncionario.setEmail(newFuncionario.getEmail());
        oldFuncionario.setSenha(this.passwordEncoder.encode(newFuncionario.getSenha()));
        oldFuncionario.setNome(newFuncionario.getNome());
        oldFuncionario.setDataNascimento(newFuncionario.getDataNascimento());

        return this.funcionarioRepository.save(oldFuncionario);
    }

    @Transactional(readOnly = false)
    public void deleteById(Long id) {
        Funcionario funcionario = this.findById(id);
        this.funcionarioRepository.delete(funcionario);
    }

    @Transactional(readOnly = true)
    public Funcionario findByEmailAndSenha(String email, String senha) {
        Funcionario funcionario = this.findByEmail(email);
        if (!this.passwordEncoder.matches(senha, funcionario.getSenha()))
            throw new CredenciaisInvalidasException("credenciais inválidas");
        return funcionario;
    }
}
