import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { MostrarOrcamentosComponent } from './pages/mostrar-orcamentos/mostrar-orcamentos.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import { PagarComponent } from './pages/pagar/pagar.component';
import { ClienteLayoutComponent } from './layout/cliente-layout/cliente-layout.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';

export const routes: Routes = [
  {
    path: '',
    component: ClienteLayoutComponent,
    children: [
      {
        path: '',
        component: PaginaInicialComponent,
      },
      {
        path: 'solicitacao-manutencao',
        component: SolicitacaoManutencaoComponent,
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
        path: 'efetuar',
        component: EfetuarOrcamentoComponent,
      },
    ],
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
    path: '**',
    redirectTo: '',
  },
];
