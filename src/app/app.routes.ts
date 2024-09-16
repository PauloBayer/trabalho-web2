import { SolicitacaoManutencaoComponent } from './solicitacao-manutencao/solicitacao-manutencao.component';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';

export const routes: Routes = [
    { path: "", component: PaginaInicialComponent },
    { path: 'solicitacao-manutencao', component: SolicitacaoManutencaoComponent }
];
