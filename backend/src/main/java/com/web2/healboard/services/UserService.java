package com.web2.healboard.services;

import com.web2.healboard.exceptions.CpfJaRegistradoException;
import com.web2.healboard.exceptions.EmailJaRegistradoException;
import com.web2.healboard.exceptions.SenhaInvalidaException;
import com.web2.healboard.models.user.User;
import com.web2.healboard.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public User findUserByEmail(String username) {
        return this.userRepository.findByEmail(username).orElseThrow(
                () -> new EntityNotFoundException("usuario não encontrado")
        );
    }

    @Transactional(readOnly = true)
    public User findUserByEmailAndSenha(String email, String password) {
        User user = this.findUserByEmail(email);
        if (!this.passwordEncoder.matches(password, user.getSenha()))
            throw new SenhaInvalidaException("senha inválida");
        return user;
    }

    public User createUser(User user) {
        if (this.userRepository.existsByEmail(user.getEmail()))
            throw new EmailJaRegistradoException("o email já está sendo usado");

        if (this.userRepository.existsByCpf(user.getCpf()))
            throw new CpfJaRegistradoException("o CPF já está sendo usado");

        String senha = String.format("%04d", new Random().nextInt(10000));
        user.setSenha(this.passwordEncoder.encode(senha));

        this.emailService.sendEmail(user.getEmail(), "Cadastro na plataforma HealBoard", senha);

        return userRepository.save(user);
    }
}
