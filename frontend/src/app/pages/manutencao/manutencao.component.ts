import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { IFuncionario } from '../../model/entities/funcionario.interface';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { ICliente } from '../../model/entities/cliente.interface';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { funcionario2 } from '../../seeds/seed';
import { EstadoSolicitacaoType } from '../../model/entities/estado-solicitacao.type';

@Component({
  selector: 'app-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencao.component.html',
})

export class ManutencaoComponent implements OnInit {
  solicitacao!: ISolicitacao;
  funcionarios: IFuncionario[] = [];
  manutencaoForm: FormGroup;
  isModalOpen = false;
  isRedirectModalOpen = false;
  funcionarioDestino = '';
  idSolicitacao = ''; // Inicializado vazio para ser preenchido pelo param da URL

  funcionarioLogado!: IFuncionario;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.manutencaoForm = this.fb.group({
      descricaoManutencao: ['', Validators.required],
      orientacoesCliente: ['', Validators.required],
      funcionarioDestino: ['']
    });
  }

  ngOnInit(): void {
    const solicitacaoId = this.route.snapshot.paramMap.get('id');
    if (solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(solicitacaoId).subscribe({
        next: (solicitacao) => {
          this.solicitacao = solicitacao;
          this.idSolicitacao = solicitacao.id;
        },
        error: (err) => {
          console.error('Erro ao buscar solicitação', err);
        }
      });
    }

    this.getFuncionarios();

    // Obtenção do usuário logado do localStorage com verificação de tipo
    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = null;

    if (userLogadoString) {
      try {
        const parsedUser = JSON.parse(userLogadoString);
        if ((parsedUser as IFuncionario).id) {
          userLogado = parsedUser as IFuncionario;
        } else if ((parsedUser as ICliente).cpf) {
          userLogado = parsedUser as ICliente;
        }
      } catch (error) {
        console.error('Erro ao parsear o usuário logado:', error);
      }
    }

    this.funcionarioLogado = userLogado as IFuncionario;
  }

  getFuncionarios(): void {
    this.funcionarioService.findAll().subscribe(
      (funcionarios) => {
        this.funcionarios = funcionarios;
      },
      (error) => {
        console.error('Erro ao carregar funcionários:', error);
      }
    );
  }

  getClienteNome(cliente: ICliente | undefined | string): string {
    if (typeof cliente === 'string') {
      return 'Cliente inválido: ' + cliente;
    }
    if (!cliente) {
      return 'Cliente não disponível';
    }
    return cliente.nome || 'Nome do cliente não disponível';
  }

  getFuncionarioNome(funcionario: IFuncionario | string | undefined): string {
    if (typeof funcionario === 'string') {
      return 'Funcionário inválido: ' + funcionario;
    }
    if (!funcionario) {
      return 'Funcionário não disponível';
    }
    return funcionario.nome || 'Nome do funcionário não disponível';
  }

 efetuarManutencao() {
  this.manutencaoForm.get('descricaoManutencao')?.setValidators(Validators.required);
  this.manutencaoForm.get('orientacoesCliente')?.setValidators(Validators.required);
  this.manutencaoForm.get('funcionarioDestino')?.clearValidators();
  this.manutencaoForm.updateValueAndValidity();

  if (this.manutencaoForm.valid) {
    const { descricaoManutencao, orientacoesCliente } = this.manutencaoForm.value;

    this.solicitacaoService.efetuarManutencao(
      this.solicitacao.id,
      descricaoManutencao,
      orientacoesCliente,
      this.funcionarioLogado
    ).subscribe(
      (response) => {
        this.solicitacao.status = 'ARRUMADA';
        if (!this.solicitacao.historico) {
          this.solicitacao.historico = [];  
        }

        this.solicitacao.historico.push({
          id: this.generateUniqueId(), 
          dataHora: new Date().toISOString(),  
          statusAtual: 'ARRUMADA',
          funcionarioOrigem: this.funcionarioLogado.id.toString(),  
          funcionario: this.funcionarioLogado.nome || 'Funcionário não disponível',  
        });

        this.isModalOpen = false;

        console.log('Manutenção efetuada com sucesso.');
      },
      (error) => {
        console.error('Erro ao efetuar manutenção:', error);
      }
    );
  } else {
    this.manutencaoForm.markAllAsTouched();
  }
}
generateUniqueId(): string {
  return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
}
redirecionarManutencao() {
  // Definindo validadores para os campos
  this.manutencaoForm.get('funcionarioDestino')?.setValidators(Validators.required);
  this.manutencaoForm.get('descricaoManutencao')?.clearValidators();
  this.manutencaoForm.get('orientacoesCliente')?.clearValidators();
  this.manutencaoForm.updateValueAndValidity();

  // Verificando se o formulário é válido
  if (this.manutencaoForm.valid) {
    // Encontrar o funcionário de destino
    const funcionarioDestino: IFuncionario = this.funcionarios.find(
      (f) => f.id === parseFloat(this.manutencaoForm.get('funcionarioDestino')?.value)
    )!;

    // Chamada para o serviço de redirecionar manutenção
    this.solicitacaoService.redirecionarManutencao(
      this.solicitacao.id,
      this.funcionarioLogado,
      funcionarioDestino
    ).subscribe(
      () => {
        // Atualizar o estado da solicitação para "REDIRECIONADA"
        this.solicitacao.status = 'REDIRECIONADA';

        // Verificar se o histórico já existe
        if (!this.solicitacao.historico) {
          this.solicitacao.historico = [];  // Inicializa o histórico se for undefined
        }

        // Adiciona o novo item no histórico
        this.solicitacao.historico.push({
          id: this.generateUniqueId(),  // Gerando um ID único
          dataHora: new Date().toISOString(),  // Convertendo a data para string ISO
          statusAtual: 'REDIRECIONADA',
          funcionarioOrigem: this.funcionarioLogado.id.toString(),  // Convertendo para string
          funcionario: this.funcionarioLogado.nome || 'Funcionário não disponível',  // Usando o nome do funcionário ou um valor default
        });

        // Fechar o modal após redirecionar
        this.isModalOpen = false;

        console.log('Manutenção redirecionada com sucesso.');
      },
      (error) => {
        console.error('Erro ao redirecionar manutenção:', error);
      }
    );
  } else {
    // Marcar todos os campos como tocados para exibir as mensagens de erro
    this.manutencaoForm.markAllAsTouched();
  }
}

finalizarSolicitacao() {
  this.solicitacaoService.finalizarSolicitacao(this.solicitacao.id, this.funcionarioLogado).subscribe(
    (response) => {
      // Sucesso ao finalizar a solicitação
      console.log('Solicitação finalizada com sucesso.');

      // Atualizando o status da solicitação localmente
      this.solicitacao.status = 'FINALIZADA';  // Defina o status conforme necessário

      // Verifique se o histórico já existe, caso contrário, inicialize-o
      if (!this.solicitacao.historico) {
        this.solicitacao.historico = [];
      }

      // Adiciona o novo item no histórico
      this.solicitacao.historico.push({
        id: this.generateUniqueId(),  // Gerar um ID único
        dataHora: new Date().toISOString(),  // Data e hora atual
        statusAtual: 'FINALIZADA',
        funcionarioOrigem: this.funcionarioLogado.id.toString(),  // Funcionario que finalizou
        funcionario: this.funcionarioLogado.nome || 'Funcionário não disponível',  // Nome do funcionário
      });

      // Fechar o modal ou redirecionar para outra tela, se necessário
      this.isModalOpen = false;

      console.log('Solicitação e histórico atualizados.');
    },
    (error) => {
      // Erro ao finalizar a solicitação
      console.error('Erro ao finalizar solicitação:', error);
    }
  );
}
}
