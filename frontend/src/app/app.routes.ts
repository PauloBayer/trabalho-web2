import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { MostrarOrcamentosComponent } from './pages/mostrar-orcamentos/mostrar-orcamentos.component';
import { VisualizarServicoComponent } from './pages/visualizar-servico/visualizar-servico.component';
import { ClienteLayoutComponent } from './layout/cliente-layout/cliente-layout.component';
import { EfetuarOrcamentoComponent } from './pages/efetuar-orcamento/efetuar-orcamento.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ManutencaoComponent } from './pages/manutencao/manutencao.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { authGuard } from './guards/auth.guard';
import { RelatorioComponent } from './pages/relatorio/relatorio.component';
import { FuncionarioLayoutComponent } from './layout/funcionario-layout/funcionario-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PrintComponent } from './pages/print/print.component';
import { PagarServicoComponent } from './pages/pagar-servico/pagar-servico.component';
import { PaginaInicialFuncionarioComponent } from './pages/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { FinalizarSolicitacaoComponent } from './pages/finalizar-solicitacao/finalizar-solicitacao.component';

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
    canActivate: [authGuard],
    data: { role: 'ROLE_CLIENTE' },
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
        path: 'orcamentos/:id',
        component: MostrarOrcamentosComponent,
      },
      {
        path: 'servico/:id',
        component: VisualizarServicoComponent,
      },
      {
        path: 'pagar-servico/:id',
        component: PagarServicoComponent
      }
    ],
  },
  {
    path: 'funcionario',
    component: FuncionarioLayoutComponent,
    canActivate: [authGuard],
    data: { role: 'ROLE_FUNCIONARIO' },
    children: [
      {
        path: '',
        component: PaginaInicialFuncionarioComponent,
      },
      {
        path: 'funcionarios',
        component: FuncionariosComponent,
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: 'funcionarios',
        component: FuncionariosComponent,
      },
      {
        path: 'efetuar-orcamento/:id',
        component: EfetuarOrcamentoComponent,
      },
      {
        path: 'solicitacao/:id',
        component: VisualizarServicoComponent,
      },
      {
        path: 'manutencao/:id',
        component: ManutencaoComponent,
      },
      {
        path: 'finalizar/:id',
        component: FinalizarSolicitacaoComponent,
      },
      {
        path: 'servico/:id',
        component: VisualizarServicoComponent,
      },
      {
        path: 'relatorio',
        component: RelatorioComponent,
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
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'print',
    component: PrintComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
