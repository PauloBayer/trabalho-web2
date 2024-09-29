import { Routes } from '@angular/router';
import { RegisterComponent } from '@app/../../frontend/src/app/pages/register/register.component';
import { LoginComponent } from '@app/../../frontend/src/app/pages/login/login.component';
import { SolicitacaoManutencaoComponent } from '@app/../../frontend/src/app/pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from '@app/../../frontend/src/app/pages/pagina-inicial/pagina-inicial.component';
import { MostrarOrcamentosComponent } from './pages/mostrar-orcamentos/mostrar-orcamentos.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import { PagarComponent } from './pages/pagar/pagar.component';

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
    component: VisualizarServicoComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];
