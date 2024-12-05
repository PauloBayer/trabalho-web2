package com.web2.healboard;

import com.web2.healboard.models.categoria.CategoriaEquipamento;
import com.web2.healboard.models.cliente.Cliente;
import com.web2.healboard.models.funcionario.Funcionario;
import com.web2.healboard.models.manutencao.SolicitacaoManutencao;
import com.web2.healboard.repositories.ClienteRepository;
import com.web2.healboard.repositories.FuncionarioRepository;
import com.web2.healboard.services.CategoriaEquipamentoService;
import com.web2.healboard.services.SolicitacaoManutencaoService;
import jakarta.persistence.EntityNotFoundException;
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
	private CategoriaEquipamentoService categoriaEquipamentoService;
	@Autowired
	private SolicitacaoManutencaoService solicitacaoManutencaoService;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
		// SEED CLIENTES
		Cliente cliente1 = new Cliente(null, "1234",  "12345678901", "cliente@email.com", 	"21987654321", "01001000", this.passwordEncoder.encode("1234"), LocalDateTime.now(), LocalDateTime.now());
		if (!this.clienteRepository.existsByEmail(cliente1.getEmail()))
			clienteRepository.save(cliente1);

		Cliente cliente2 = new Cliente(null, "joao", "10987654321", "joao@example.com", "31987654321", "02002000", this.passwordEncoder.encode("1234"), LocalDateTime.now(), LocalDateTime.now());
		if (!this.clienteRepository.existsByEmail(cliente2.getEmail()))
			clienteRepository.save(cliente2);

		// SEED FUNCIONARIOS
		Funcionario funcionario1 = new Funcionario(null, "nome funcionario", "funcionario@email.com", this.passwordEncoder.encode("1234"), LocalDate.of(2000, 10, 21));
		if (!this.funcionarioRepository.existsByEmail(funcionario1.getEmail()))
			funcionarioRepository.save(funcionario1);

		Funcionario funcionario2 = new Funcionario(null, "funcionario 2", "funcionario2@email.com", this.passwordEncoder.encode("1234"), LocalDate.of(2000, 10, 21));
		if (!this.funcionarioRepository.existsByEmail(funcionario2.getEmail()))
			funcionarioRepository.save(funcionario2);

		// SEED CATEGORIAS
		try {
			this.categoriaEquipamentoService.findCategoriaByNome("NOTEBOOK");
		} catch (EntityNotFoundException e) {
			CategoriaEquipamento categoriaEquipamento = new CategoriaEquipamento();
			categoriaEquipamento.setNome("NOTEBOOK");
			categoriaEquipamento.setDescription("notebook description");
			this.categoriaEquipamentoService.criarCategoria(categoriaEquipamento);
		}

		try {
			this.categoriaEquipamentoService.findCategoriaByNome("SMARTPHONE");
		} catch (EntityNotFoundException e) {
			CategoriaEquipamento categoriaEquipamento = new CategoriaEquipamento();
			categoriaEquipamento.setNome("SMARTPHONE");
			categoriaEquipamento.setDescription("SMARTPHONE description");
			this.categoriaEquipamentoService.criarCategoria(categoriaEquipamento);
		}

		// SEED SOLICITACOES
		if (this.solicitacaoManutencaoService.findAll().size() < 9) {
			// ABERTA
			this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 0",
					"descricao defeito equipamento 0",
					cliente1
			);

			this.solicitacaoManutencaoService.registrarSolicitacao(
					"SMARTPHONE",
					"descricao equipamento 1",
					"descricao defeito equipamento 1",
					cliente1
			);

			// ORCADA
			SolicitacaoManutencao solicitacaoManutencao2 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 2",
					"descricao defeito equipamento 2",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao2.getId(),
					funcionario1,
                    100.0F,
					"orientacoes extras equipamento 2"
			);

			// APROVADA
			SolicitacaoManutencao solicitacaoManutencao3 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 3",
					"descricao defeito equipamento 3",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao3.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 3"
			);
			this.solicitacaoManutencaoService.aprovarServico(
					solicitacaoManutencao3.getId(),
					cliente1
			);

			// REJEITADA
			SolicitacaoManutencao solicitacaoManutencao4 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 4",
					"descricao defeito equipamento 4",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao4.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 4"
			);
			this.solicitacaoManutencaoService.rejeitarServico(
					solicitacaoManutencao4.getId(),
					cliente1,
					"motivo rejeicao equipamento 4"
			);

			// REDIRECIONADA
			SolicitacaoManutencao solicitacaoManutencao5 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 5",
					"descricao defeito equipamento 5",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao5.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 5"
			);
			this.solicitacaoManutencaoService.aprovarServico(
					solicitacaoManutencao5.getId(),
					cliente1
			);
			this.solicitacaoManutencaoService.redirecionarManutencao(
					solicitacaoManutencao5.getId(),
					funcionario1,
					funcionario2.getId()
			);

			// AGUARDANDO_PAGAMENTO
			SolicitacaoManutencao solicitacaoManutencao6 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 6",
					"descricao defeito equipamento 6",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao6.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 6"
			);
			this.solicitacaoManutencaoService.aprovarServico(
					solicitacaoManutencao6.getId(),
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarManutencao(
					solicitacaoManutencao6.getId(),
					funcionario1,
					"descricao manutencao equipamento 6",
					"orientacoes manutencao equipamento 6"
			);

			// PAGA
			SolicitacaoManutencao solicitacaoManutencao7 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 7",
					"descricao defeito equipamento 7",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao7.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 7"
			);
			this.solicitacaoManutencaoService.aprovarServico(
					solicitacaoManutencao7.getId(),
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarManutencao(
					solicitacaoManutencao7.getId(),
					funcionario1,
					"descricao manutencao equipamento 7",
					"orientacoes manutencao equipamento 7"
			);
			this.solicitacaoManutencaoService.pagarServico(
					solicitacaoManutencao7.getId(),
					cliente1
			);

			// FINALIZADA
			SolicitacaoManutencao solicitacaoManutencao8 = this.solicitacaoManutencaoService.registrarSolicitacao(
					"NOTEBOOK",
					"descricao equipamento 8",
					"descricao defeito equipamento 8",
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarOrcamento(
					solicitacaoManutencao8.getId(),
					funcionario1,
					300.0F,
					"orientacoes extras equipamento 8"
			);
			this.solicitacaoManutencaoService.aprovarServico(
					solicitacaoManutencao8.getId(),
					cliente1
			);
			this.solicitacaoManutencaoService.efetuarManutencao(
					solicitacaoManutencao8.getId(),
					funcionario1,
					"descricao manutencao equipamento 8",
					"orientacoes manutencao equipamento 8"
			);
			this.solicitacaoManutencaoService.pagarServico(
					solicitacaoManutencao8.getId(),
					cliente1
			);
			this.solicitacaoManutencaoService.finalizarManutencao(
					solicitacaoManutencao8.getId(),
					funcionario1
			);
		}
	}
}
