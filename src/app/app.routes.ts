import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { MostrarOrcamentosComponent } from './pages/mostrar-orcamentos/mostrar-orcamentos.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import { PagarComponent } from './pages/pagar/pagar.component';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
  },
  {
    path: 'solicitacao-manutencao',
    component: SolicitacaoManutencaoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'orcamentos',
    component: MostrarOrcamentosComponent,
  },
  {
    path: 'pagar',
    component: PagarComponent,
  },
  {
    path: 'servico',
    component: VisualizarServicoComponent,
  },
  {
    path: 'Relatorio',
    component: RelatorioComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
