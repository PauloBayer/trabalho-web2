import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManutencaoService } from '../../services/manutencao.service';

@Component({
  selector: 'app-manutencao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencao.component.html'
})
export class ManutencaoComponent {
  solicitacao: any;
  manutencaoForm: FormGroup;
  isModalOpen = false;
  isRedirectModalOpen = false;
  funcionarioAtual = 'Ichigo Kurosaki';
  funcionarioDestino = '';

  constructor(private manutencaoService: ManutencaoService, private fb: FormBuilder) {
    this.solicitacao = this.manutencaoService.getSolicitacaoById('1');
    this.manutencaoForm = this.fb.group({
      descricaoManutencao: [''], 
      orientacoesCliente: [''],  
      funcionarioDestino: ['']  
    });
  }

  efetuarManutencao() {
    this.manutencaoForm.get('descricaoManutencao')?.setValidators(Validators.required);
    this.manutencaoForm.get('orientacoesCliente')?.setValidators(Validators.required);
    this.manutencaoForm.get('funcionarioDestino')?.clearValidators(); 
    this.manutencaoForm.updateValueAndValidity();

    if (this.manutencaoForm.valid) {
      const { descricaoManutencao, orientacoesCliente } = this.manutencaoForm.value;
      this.manutencaoService.efetuarManutencao('1', descricaoManutencao, orientacoesCliente, this.funcionarioAtual);
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
      this.manutencaoService.redirecionarManutencao('1', this.funcionarioAtual, this.manutencaoForm.value.funcionarioDestino);
    } else {
      this.manutencaoForm.markAllAsTouched();
    }
  }

  finalizarSolicitacao() {
    this.manutencaoService.finalizarSolicitacao('1', this.funcionarioAtual);
  }
}
