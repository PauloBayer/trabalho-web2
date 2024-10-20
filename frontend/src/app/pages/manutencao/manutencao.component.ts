import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { IFuncionario } from '../../model/entities/funcionario.interface';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { ICliente } from '../../model/entities/cliente.interface';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';

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
        () => {
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

  redirecionarManutencao() {
    this.manutencaoForm.get('funcionarioDestino')?.setValidators(Validators.required);
    this.manutencaoForm.get('descricaoManutencao')?.clearValidators();
    this.manutencaoForm.get('orientacoesCliente')?.clearValidators();
    this.manutencaoForm.updateValueAndValidity();

    if (this.manutencaoForm.valid) {
      const funcionarioDestino: IFuncionario = this.funcionarios.find(
        (f) => f.id === parseFloat(this.manutencaoForm.get('funcionarioDestino')?.value)
      )!;

      this.solicitacaoService.redirecionarManutencao(
        this.solicitacao.id,
        this.funcionarioLogado,
        funcionarioDestino
      ).subscribe(
        () => {
          console.log('Manutenção redirecionada com sucesso.');
        },
        (error) => {
          console.error('Erro ao redirecionar manutenção:', error);
        }
      );
    } else {
      this.manutencaoForm.markAllAsTouched();
    }
  }

  finalizarSolicitacao() {
    this.solicitacaoService.finalizarSolicitacao(this.solicitacao.id, this.funcionarioLogado).subscribe(
      () => {
        console.log('Solicitação finalizada com sucesso.');
      },
      (error) => {
        console.error('Erro ao finalizar solicitação:', error);
      }
    );
  }
}
