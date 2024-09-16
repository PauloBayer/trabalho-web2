import { Routes } from '@angular/router';
import { RegisterComponent} from './pages/register/register.component'; 
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    { path: "", component: PaginaInicialComponent },
    { path: 'solicitacao-manutencao', component: SolicitacaoManutencaoComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: "register", component: RegisterComponent },
    { path: '**', redirectTo: '/login' },
];
