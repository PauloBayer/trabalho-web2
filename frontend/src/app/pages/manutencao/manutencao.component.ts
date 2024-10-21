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
  idSolicitacao = '';

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
      return 'Funcionário';
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
      ).subscribe({
        next: (response) => {
          this.isModalOpen = false;
          this.router.navigateByUrl(`/funcionario/manutencao/${this.solicitacao.id}`).then(() => {
            this.loadSolicitacaoData();
          });
        },
        error: (error) => {
          this.isModalOpen = false;
          console.error('Erro ao efetuar manutenção:', error);
          this.router.navigateByUrl(`/funcionario/manutencao/${this.solicitacao.id}`).then(() => {
            this.loadSolicitacaoData();
          });
        }
      });
    } else {
      this.manutencaoForm.markAllAsTouched();
    }
  }
}

finalizarSolicitacao() {
  this.solicitacaoService.finalizarSolicitacao(this.solicitacao.id).subscribe(
    (response) => {
      // Sucesso ao finalizar a solicitação
      console.log('Solicitação finalizada com sucesso.');
   });
}

  redirecionarManutencao() {
    this.manutencaoForm.get('funcionarioDestino')?.clearValidators();
    this.manutencaoForm.get('descricaoManutencao')?.clearValidators();
    this.manutencaoForm.get('orientacoesCliente')?.clearValidators();
    this.manutencaoForm.updateValueAndValidity();
    
    if (1) {
      const funcionarioDestinoId = parseFloat(this.manutencaoForm.get('funcionarioDestino')?.value);
      const funcionarioDestino: IFuncionario = this.funcionarios.find(f => f.id === funcionarioDestinoId)!;
  
      this.solicitacaoService.redirecionarManutencao(
        this.solicitacao.id,
        this.funcionarioLogado,
        funcionarioDestino
      ).subscribe(
        () => {
          this.solicitacao.status = 'REDIRECIONADA';
          if (!this.solicitacao.historico) {
            this.solicitacao.historico = [];
          }
  
          const funcionarioNome = this.getFuncionarioNome(this.funcionarioLogado);
          
          this.solicitacao.historico.push({
            id: this.generateUniqueId(),
            dataHora: new Date().toISOString(),
            statusAtual: 'REDIRECIONADA',
            funcionarioOrigem: this.funcionarioLogado.id.toString(),
            funcionario: funcionarioNome,
          });
          this.isRedirectModalOpen = false;
          this.router.navigateByUrl(`/funcionario/manutencao/${this.solicitacao.id}`).then(() => {
            this.loadSolicitacaoData();
          });
        },
        (error) => {
          this.router.navigateByUrl(`/funcionario/manutencao/${this.solicitacao.id}`).then(() => {
            this.loadSolicitacaoData();
          });
        }
      );
    } else {
      this.manutencaoForm.markAllAsTouched();
    }
  }

  generateUniqueId(): string {
    return 'id-' + new Date().getTime() + '-' + Math.floor(Math.random() * 1000);
  }

  loadSolicitacaoData(): void {
    const solicitacaoId = this.route.snapshot.paramMap.get('id');
    if (solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(solicitacaoId).subscribe({
        next: (solicitacao) => {
          this.solicitacao = solicitacao;
        },
        error: (err) => {
          console.error('Erro ao carregar dados atualizados da solicitação', err);
        }
      });
    }
  }
}
