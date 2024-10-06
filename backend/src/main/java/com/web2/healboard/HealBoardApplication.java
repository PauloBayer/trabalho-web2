package com.web2.healboard;

import com.web2.healboard.models.user.User;
import com.web2.healboard.models.user.UserRoleEnum;
import com.web2.healboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

@SpringBootApplication
public class HealBoardApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(HealBoardApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		this.userRepository.deleteAll();

		User user1 = new User(
				1L,
				"1234",
				"12345678901",
				"cliente@email.com",
				"21987654321",
				"01001000",
				this.passwordEncoder.encode("1234"),
				UserRoleEnum.CLIENTE,
				LocalDateTime.now(),
				LocalDateTime.now()
		);

		User user2 = new User(
				2L,
				"joao",
				"10987654321",
				"joao@example.com",
				"31987654321",
				"02002000",
				this.passwordEncoder.encode("1234"),
				UserRoleEnum.CLIENTE,
				LocalDateTime.now(),
				LocalDateTime.now()
		);

		User user3 = new User(
				3L,
				"Funcionario 1234",
				"98765432100",
				"funcionario@email.com",
				"11987654321",
				"03003000",
				this.passwordEncoder.encode("1234"),
				UserRoleEnum.FUNCIONARIO,
				LocalDateTime.now(),
				LocalDateTime.now()
		);

		userRepository.save(user1);
		userRepository.save(user2);
		userRepository.save(user3);
	}
}
