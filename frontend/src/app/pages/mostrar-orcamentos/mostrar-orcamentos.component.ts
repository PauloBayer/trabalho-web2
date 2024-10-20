import { Component, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ISolicitacao } from '../../model/entities/solicitacao.interface';
import { SolicitacaoService } from '../../services/solicitacao.service';

@Component({
  selector: 'app-mostrar-orcamentos',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './mostrar-orcamentos.component.html',
  styleUrl: './mostrar-orcamentos.component.css'
})
export class MostrarOrcamentosComponent implements OnInit {
  solicitacaoId: string | null = null;
  solicitacao!: ISolicitacao;
  readonly panelOpenState = signal(false);

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private solicitacaoService: SolicitacaoService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.solicitacaoId = params.get('id');
    });

    if (this.solicitacaoId) {
      this.solicitacaoService.getSolicitacaoById(this.solicitacaoId).subscribe({
        next: (data: ISolicitacao) => {
          this.solicitacao = data;

          if (this.solicitacao.status !== 'ORCADA') {
            alert('Não é possível pagar o serviço porque o status não é ORCADA');
            this.router.navigate(['client']);
          }
        },
        error: (error) => {
          this.router.navigate(['not-found']);
        }
      });
    }
  }

  openDialogAccept() {
    const dialogRef = this.dialog.open(DialogContentAccept);

    dialogRef.afterClosed().subscribe(result => {
      this.solicitacaoService.aprovarServico(this.solicitacao.id).subscribe({
        next: () => {
          alert(`Serviço aprovado com sucesso`);
          this.router.navigate(['client']);
        },
        error: (error) => {
          alert(`ERRO ao tentar aprovar o serviço: ${error}`);
          this.router.navigate(['client']);
        }
      });
    });
  }

  openDialogDecline() {
    const dialogRef = this.dialog.open(DialogContentDecline);

    dialogRef.afterClosed().subscribe(result => {
      const motivoRejeicao = result;

      this.solicitacaoService.rejeitarServico(this.solicitacao.id, motivoRejeicao).subscribe({
        next: () => {
          alert(`Serviço rejeitado com sucesso`);
          this.router.navigate(['client']);
        },
        error: (error) => {
          alert(`ERRO ao tentar aprovar o serviço: ${error}`);
          this.router.navigate(['client']);
        }
      });
    });
  }

  formatDate(timestamp: string): string {
    const date = new Date(timestamp);

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}h${minutes}`;
  }
}

@Component({
  selector: 'dialog-accept-orcamento',
  templateUrl: './components/dialog-accept-orcamento.html',
  styleUrls: ['./components/dialog-accept-orcamento.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule
  ],
})
export class DialogContentAccept {}

@Component({
  selector: 'dialog-decline-orcamento',
  templateUrl: './components/dialog-decline-orcamento.html',
  styleUrls: ['./components/dialog-decline-orcamento.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class DialogContentDecline {

  constructor(public dialogRef: MatDialogRef<DialogContentDecline>) {}

  formGroup = new FormGroup({
    reason: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(1)])
  });

  reasonInputed: boolean = false;

  closeDialog() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.reason);
    }
  }

  inputReason() {
    this.reasonInputed = true;
  }

}