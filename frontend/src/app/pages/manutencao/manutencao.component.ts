import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { IFuncionario } from '../../model/entities/funcionario.interface';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { ICliente } from '../../model/entities/cliente.interface';
import { funcionario2 } from '../../seeds/seed';

@Component({
  selector: 'app-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencao.component.html'
})
export class ManutencaoComponent {
  solicitacao!: ISolicitacao;
  manutencaoForm: FormGroup;
  isModalOpen = false;
  isRedirectModalOpen = false;
  funcionarioDestino = '';
  idSolicitacao = '7e0bfbf7-4ec2-4f21-9b90-bd9094ebd5d7'; // puxar do param da url

  funcionarioLogado: IFuncionario; // remover quando tiver a api

  constructor(private solicitacaoService: SolicitacaoService, private fb: FormBuilder) {
    this.manutencaoForm = this.fb.group({
      descricaoManutencao: [''],
      orientacoesCliente: [''],
      funcionarioDestino: ['']
    });

    let userLogadoString = localStorage.getItem('userLogado');
    let userLogado: IFuncionario | ICliente | null = userLogadoString ? JSON.parse(userLogadoString) : null;
    this.funcionarioLogado = userLogado as IFuncionario;

    this.solicitacaoService.getSolicitacaoById(this.idSolicitacao).subscribe(
      (solicitacao) => {
        this.solicitacao = solicitacao;
      },
      (error) => {
        console.error('Erro ao obter solicitação:', error);
      }
    );
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
      const funcionarioDestino: IFuncionario = funcionario2;

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
