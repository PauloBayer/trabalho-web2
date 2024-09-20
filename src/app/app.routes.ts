import { Routes } from '@angular/router';
import { RegisterComponent} from './pages/register/register.component'; 
import { LoginComponent } from './pages/login/login.component';
import { SolicitacaoManutencaoComponent } from './pages/solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { authGuard } from './guards/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    { path: '', component: PaginaInicialComponent, canActivate: [authGuard] },
    { path: 'solicitacao-manutencao', component: SolicitacaoManutencaoComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '' },
];
