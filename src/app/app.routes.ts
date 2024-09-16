import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SolicitacaoManutencaoComponent } from './solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    { path: "", component: PaginaInicialComponent },
    { path: 'solicitacao-manutencao', component: SolicitacaoManutencaoComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' },
];
