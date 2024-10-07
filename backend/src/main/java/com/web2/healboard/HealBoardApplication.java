package com.web2.healboard;

import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.repositories.ClienteRepository;
import com.web2.healboard.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootApplication
public class HealBoardApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(HealBoardApplication.class, args);
	}

	@Autowired
	private ClienteRepository clienteRepository;
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		if (!this.clienteRepository.existsByEmail("cliente@email.com")) {
			Cliente cliente1 = new Cliente(
					1L,
					"1234",
					"12345678901",
					"cliente@email.com",
					"21987654321",
					"01001000",
					this.passwordEncoder.encode("1234"),
					LocalDateTime.now(),
					LocalDateTime.now()
			);

			clienteRepository.save(cliente1);
		}

		if (!this.clienteRepository.existsByEmail("joao@example.com")) {
			Cliente cliente2 = new Cliente(
					2L,
					"joao",
					"10987654321",
					"joao@example.com",
					"31987654321",
					"02002000",
					this.passwordEncoder.encode("1234"),
					LocalDateTime.now(),
					LocalDateTime.now()
			);

			clienteRepository.save(cliente2);
		}

		if (!this.funcionarioRepository.existsByEmail("funcionario@email.com")) {
			Funcionario funcionario1 = new Funcionario(
					3L,
					"Funcionario 1234",
					"funcionario@email.com",
					this.passwordEncoder.encode("1234"),
					LocalDate.of(2000, 10, 21)
			);

			funcionarioRepository.save(funcionario1);
		}
	}
}
