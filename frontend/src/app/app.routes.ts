import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { MostrarOrcamentosComponent } from './pages/mostrar-orcamentos/mostrar-orcamentos.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import { ClienteLayoutComponent } from './layout/cliente-layout/cliente-layout.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';
import { SolicitacoesFuncionarioComponent } from './pages/solicitacoes-funcionario/solicitacoes-funcionario.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ManutencaoComponent } from './pages/manutencao/manutencao.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
    ],
  },
  {
    path: 'client',
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
        path: 'servico',
        component: VisualizarServicoComponent,
      },
      {
        path: 'efetuar',
        component: EfetuarOrcamentoComponent,
      },
      {
        path: 'solicitacoes',
        component: SolicitacoesFuncionarioComponent,
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: 'manutencao',
        component: ManutencaoComponent,
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
