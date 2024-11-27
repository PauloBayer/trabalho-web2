import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Funcionario } from '../../model/entities/funcionario';
import { Solicitacao } from '../../model/entities/solicitacao';
import { Cliente } from '../../model/entities/cliente';
import { FuncionarioService } from '../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencao.component.html',
})
export class ManutencaoComponent implements OnInit {
  solicitacao!: Solicitacao;
  funcionarios: Funcionario[] = [];
  manutencaoForm: FormGroup;
  isModalOpen = false;
  isRedirectModalOpen = false;
  funcionarioDestino = '';
  idSolicitacao = '';

  funcionarioLogado!: Funcionario;

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
      funcionarioDestino: [''],
    });
  }

  ngOnInit(): void {
    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: Funcionario | Cliente | null = userLogadoString
      ? JSON.parse(userLogadoString)
      : null;
    this.funcionarioLogado = userLogado as Funcionario;

    const solicitacaoId = this.route.snapshot.paramMap.get('id');
    if (solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(solicitacaoId).subscribe({
        next: (solicitacao) => {
          this.solicitacao = solicitacao;
          this.idSolicitacao = solicitacao.id;
        },
        error: (err) => {
          console.error('Erro ao buscar solicitação', err);
          this.router.navigate(['funcionario']);
        },
      });
    }

    this.funcionarioService.findAll().subscribe({
      next: (funcionarios) => {
        this.funcionarios = funcionarios.filter(
          (funcionario) => funcionario.id !== this.funcionarioLogado.id
        );
      },
      error: (error) => {
        console.error('Erro ao carregar funcionários:', error);
        this.router.navigate(['funcionario']);
      },
    });
  }

  getClienteNome(cliente: Cliente | undefined | string): string {
    if (typeof cliente === 'string') return 'Cliente inválido: ' + cliente;

    if (!cliente) return 'Cliente não disponível';

    return cliente.nome || 'Nome do cliente não disponível';
  }

  getFuncionarioNome(funcionario: Funcionario | string | undefined): string {
    if (typeof funcionario === 'string')
      return 'Funcionário inválido: ' + funcionario;

    if (!funcionario) return 'Funcionário';

    return funcionario.nome || 'Nome do funcionário não disponível';
  }

  efetuarManutencao() {
    if (!this.manutencaoForm.valid) return;

    this.manutencaoForm.markAllAsTouched();
    const { descricaoManutencao, orientacoesCliente } =
      this.manutencaoForm.value;

    this.solicitacaoService
      .efetuarManutencao(
        this.solicitacao.id,
        descricaoManutencao,
        orientacoesCliente,
        this.funcionarioLogado
      )
      .subscribe({
        next: (response) => {
          this.isModalOpen = false;
          alert('Manutenção efetuada com sucesso');
          this.router.navigate(['funcionario']);
        },
        error: (error) => {
          this.isModalOpen = false;
          alert('erro ao efetuar manutenção');
          this.router.navigate(['funcionario']);
        },
      });
  }

  redirecionarManutencao() {
    this.manutencaoForm.get('funcionarioDestino')?.clearValidators();
    const funcionarioDestinoId = parseFloat(
      this.manutencaoForm.get('funcionarioDestino')?.value
    );
    const funcionarioDestino: Funcionario = this.funcionarios.find(
      (f) => f.id === funcionarioDestinoId
    )!;

    this.solicitacaoService
      .redirecionarManutencao(this.solicitacao.id, funcionarioDestino)
      .subscribe({
        next: (data) => {
          this.isModalOpen = false;
          alert('sucesso ao redirecionar manutenção');
          this.router.navigate(['funcionario']);
        },
        error: (error) => {
          this.isModalOpen = false;
          alert('erro ao redirecionar manutencao');
          this.router.navigate(['funcionario']);
        },
      });
  }
}
