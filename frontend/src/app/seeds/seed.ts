import { ICategoriaEquipamento } from "../model/entities/categoria-equipamento.interface";
import { ICliente } from "../model/entities/cliente.interface";
import { EstadoSolicitacaoType } from "../model/entities/estado-solicitacao.type";
import { IFuncionario } from "../model/entities/funcionario.interface";
import { IHistorico } from "../model/entities/historico.interface";
import { ISolicitacao } from "../model/entities/solicitacao.interface";


export const funcionario1: IFuncionario = { id: Math.random(), email: 'maria.santos@email.com', nome: 'Maria Santos', dataNascimento: '1985-07-15', senha: '1234' };
export const funcionario2: IFuncionario = { id: Math.random(), email: 'mario.souza@email.com', nome: 'Mário Souza', dataNascimento: '1990-03-20', senha: '1234' };
export const funcionario3: IFuncionario = { id: Math.random(), email: 'funcionario@email.com', nome: 'funcionario', dataNascimento: '2000-03-20', senha: '1234' };

export const funcionariosSeed: IFuncionario [] = [ funcionario1, funcionario2, funcionario3 ];

const cliente1: ICliente = { id: Math.random(), cpf: '123.456.789-00', nome: 'João Silva', email: 'joao.silva@email.com', endereco: 'Rua das Flores, 123', telefone: '(11) 91234-5678', cep: '01001-000', senha: '1234' };
const cliente2: ICliente = { id: Math.random(), cpf: '987.654.321-00', nome: 'José Pereira', email: 'jose.pereira@email.com', endereco: 'Avenida Paulista, 456', telefone: '(11) 98765-4321', cep: '01310-100', senha: '1234' };
const cliente3: ICliente = { id: Math.random(), cpf: '196.885.590-40', nome: 'cliente', email: 'cliente@email.com', endereco: 'Avenida Paulista, 456', telefone: '(11) 98765-4321', cep: '01310-100', senha: '1234' };
const cliente4: ICliente = { id: Math.random(), cpf: '456.123.789-00', nome: 'Joana Souza', email: 'joana.souza@email.com', endereco: 'Rua das Palmeiras, 789', telefone: '(21) 91234-5678', cep: '20031-050', senha: '1234' };
const cliente5: ICliente = { id: Math.random(), cpf: '321.654.987-00', nome: 'Joaquina Oliveira', email: 'joaquina.oliveira@email.com', endereco: 'Rua da Liberdade, 101', telefone: '(21) 98765-4321', cep: '20220-150', senha: '1234' };

export const clientesSeed: ICliente[] = [cliente1, cliente2, cliente3, cliente4, cliente5];


export const categoria1: ICategoriaEquipamento = { name: 'Computadores', description: 'Manutenção e configuração de computadores desktop e notebooks' };
export const categoria2: ICategoriaEquipamento = { name: 'Impressoras', description: 'Reparos e manutenção de impressoras multifuncionais e laser' };
export const categoria3: ICategoriaEquipamento = { name: 'Monitores', description: 'Serviços de reparo e calibração de monitores LED, LCD e OLED' };
export const categoria4: ICategoriaEquipamento = { name: 'Smartphones', description: 'Reparo de telas, baterias e componentes internos de smartphones' };
export const categoria5: ICategoriaEquipamento = { name: 'Redes', description: 'Configuração e manutenção de redes cabeadas e Wi-Fi' };
export const categoria6: ICategoriaEquipamento = { name: 'Servidores', description: 'Manutenção preventiva e corretiva de servidores e storages' };
export const categoria7: ICategoriaEquipamento = { name: 'Periféricos', description: 'Reparo de teclados, mouses, e outros periféricos de computador' };
export const categoria8: ICategoriaEquipamento = { name: 'Audio e Vídeo', description: 'Instalação e reparo de equipamentos de áudio e vídeo' };
export const categoria9: ICategoriaEquipamento = { name: 'Software', description: 'Suporte e instalação de software de sistema e aplicativos' };
export const categoria10: ICategoriaEquipamento = { name: 'Eletrodomésticos', description: 'Reparos e manutenção de eletrodomésticos de pequeno porte' };

export const categoriasSeed: ICategoriaEquipamento[] = [
  categoria1, categoria2, categoria3, categoria4, categoria5, categoria6, categoria7, categoria8, categoria9, categoria10
];


// Solicitação 1 - ABERTA
const historico1_ABERTA: IHistorico = { id: '1', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-01T12:45:30Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };

// Solicitação 2 - ORCADA
const historico2_ABERTA: IHistorico = { id: '2a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-04T14:22:18Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico2_ORCADA: IHistorico = { id: '2b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-04T14:22:18Z', valorOrcado: 200.0, funcionario: funcionario3 };

// Solicitação 3 - APROVADA
const historico3_ABERTA: IHistorico = { id: '3a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-04T14:22:18Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico3_ORCADA: IHistorico = { id: '3b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-04T14:22:18Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico3_APROVADA: IHistorico = { id: '3c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.APROVADA, dataHora: '2023-09-04T14:22:18Z', valorOrcado: 200.0, funcionario: funcionario3 };

// Solicitação 4 - REJEITADA
const historico4_ABERTA: IHistorico = { id: '4a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-09T07:25:15Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico4_ORCADA: IHistorico = { id: '4b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-09T07:25:15Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico4_REJEITADA: IHistorico = { id: '4c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.REJEITADA, dataHora: '2023-09-09T07:25:15Z', motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', funcionario: funcionario3 };

// Solicitação 5 - REDIRECIONADA
const historico5_ABERTA: IHistorico = { id: '5a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-08T13:40:30Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico5_ORCADA: IHistorico = { id: '5b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-08T13:40:30Z', valorOrcado: 200.0, funcionario: funcionario2 };
const historico5_REDIRECIONADA: IHistorico = { id: '5c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.REDIRECIONADA, dataHora: '2023-09-08T13:40:30Z', funcionarioOrigem: funcionario2, funcionarioDestino: funcionario2 };

// Solicitação 6 - AGUARDANDO_PAGAMENTO
const historico6_ABERTA: IHistorico = { id: '6a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-05T16:50:12Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico6_ORCADA: IHistorico = { id: '6b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-05T16:50:12Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico6_APROVADA: IHistorico = { id: '6c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.APROVADA, dataHora: '2023-09-05T16:50:12Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico6_AGUARDANDO_PAGAMENTO: IHistorico = { id: '6d', statusAnterior: EstadoSolicitacaoType.APROVADA, statusAtual: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, dataHora: '2023-09-05T16:50:12Z', funcionario: funcionario3, descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum' };

// Solicitação 7 - PAGA
const historico7_ABERTA: IHistorico = { id: '7a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-20T08:35:50Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico7_ORCADA: IHistorico = { id: '7b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-20T08:35:50Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico7_APROVADA: IHistorico = { id: '7c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.APROVADA, dataHora: '2023-09-20T08:35:50Z', valorOrcado: 200.0, funcionario: funcionario3 };
const historico7_AGUARDANDO_PAGAMENTO: IHistorico = { id: '7d', statusAnterior: EstadoSolicitacaoType.APROVADA, statusAtual: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, dataHora: '2023-09-20T08:35:50Z', funcionario: funcionario3, descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum' };
const historico7_PAGA: IHistorico = { id: '7e', statusAnterior: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, statusAtual: EstadoSolicitacaoType.PAGA, dataHora: '2023-09-20T08:35:50Z' };

// Solicitação 8 - FINALIZADA
const historico8_ABERTA: IHistorico = { id: '8a', statusAtual: EstadoSolicitacaoType.ABERTA, dataHora: '2023-09-20T08:35:50Z', descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum' };
const historico8_ORCADA: IHistorico = { id: '8b', statusAnterior: EstadoSolicitacaoType.ABERTA, statusAtual: EstadoSolicitacaoType.ORCADA, dataHora: '2023-09-20T08:35:50Z', valorOrcado: 200.0, funcionario: funcionario2 };
const historico8_APROVADA: IHistorico = { id: '8c', statusAnterior: EstadoSolicitacaoType.ORCADA, statusAtual: EstadoSolicitacaoType.APROVADA, dataHora: '2023-09-20T08:35:50Z', valorOrcado: 200.0, funcionario: funcionario2 };
const historico8_AGUARDANDO_PAGAMENTO: IHistorico = { id: '8d', statusAnterior: EstadoSolicitacaoType.APROVADA, statusAtual: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, dataHora: '2023-09-20T08:35:50Z', funcionario: funcionario2, descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum' };
const historico8_PAGA: IHistorico = { id: '8e', statusAnterior: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, statusAtual: EstadoSolicitacaoType.PAGA, dataHora: '2023-09-20T08:35:50Z' };
const historico8_FINALIZADA: IHistorico = { id: '8f', statusAnterior: EstadoSolicitacaoType.PAGA, statusAtual: EstadoSolicitacaoType.FINALIZADA, dataHora: '2023-09-20T08:35:50Z' };


const solicitacao1: ISolicitacao = { id: '7e0bfbf7-4ec2-4f21-9b90-bd9094ebd5d7', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-01T12:45:30Z', cliente: cliente5, status: EstadoSolicitacaoType.ABERTA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', historico: [ historico1_ABERTA ] };
const solicitacao2: ISolicitacao = { id: 'e5d178e0-9203-4b8f-bf9a-c2fa5f5a3b85', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-04T14:22:18Z', cliente: cliente5, status: EstadoSolicitacaoType.ORCADA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario3, historico: [ historico2_ABERTA, historico2_ORCADA ] };
const solicitacao3: ISolicitacao = { id: '3f3cb91b-b282-47ff-a1cb-50f4f8ff92d9', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-04T14:22:18Z', cliente: cliente5, status: EstadoSolicitacaoType.APROVADA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario3, historico: [ historico3_ABERTA, historico3_ORCADA, historico3_APROVADA ] };
const solicitacao4: ISolicitacao = { id: '0987b004-53bc-4ef5-96f6-efb32a389071', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-09T07:25:15Z', cliente: cliente5, status: EstadoSolicitacaoType.REJEITADA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario3, motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', historico: [ historico4_ABERTA, historico4_ORCADA, historico4_REJEITADA ] };
const solicitacao5: ISolicitacao = { id: '5a17769b-280f-40bb-9b64-9e95b73925b4', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-08T13:40:30Z', cliente: cliente5, status: EstadoSolicitacaoType.REDIRECIONADA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario2, motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', historico: [ historico5_ABERTA, historico5_ORCADA, historico5_REDIRECIONADA ] };
const solicitacao6: ISolicitacao = { id: 'a65d6506-9925-4d6e-a479-bc3d5c647229', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-05T16:50:12Z', cliente: cliente5, status: EstadoSolicitacaoType.AGUARDANDO_PAGAMENTO, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario3, motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum', historico: [ historico6_ABERTA, historico6_ORCADA, historico6_APROVADA, historico6_AGUARDANDO_PAGAMENTO ] };
const solicitacao7: ISolicitacao = { id: 'bd73a5b9-590f-4a77-9dc3-4d1cc7f8573e', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-20T08:35:50Z', cliente: cliente5, status: EstadoSolicitacaoType.PAGA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario3, motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum', historico: [ historico7_ABERTA, historico7_ORCADA, historico7_APROVADA, historico7_AGUARDANDO_PAGAMENTO, historico7_PAGA ] };
const solicitacao8: ISolicitacao = { id: 'bd73a5b9-590f-4a77-9dc3-4d1cc7f8573e', categoriaEquipamento: categoria2, dataHoraCriacao: '2023-09-20T08:35:50Z', cliente: cliente5, status: EstadoSolicitacaoType.FINALIZADA, descricaoEquipamento: 'descricaoEquipamento lorem ipsum ergo sutum', descricaoDefeito: 'descricaoDefeito lorem ipsum ergo sutum', valorOrcado: 200.0, funcionario: funcionario2, motivoRejeicao: 'motivoRejeicao lorem ipsum ergo sutum', descricaoManutencao: 'descricaoManutencao lorem ipsum ergo sutum', orientacoesManutencao: 'orientacoesManutencao lorem ipsum ergo sutum', historico: [ historico8_ABERTA, historico8_ORCADA, historico8_APROVADA, historico8_AGUARDANDO_PAGAMENTO, historico8_PAGA, historico8_FINALIZADA ] };

export const solicitacoesSeed: ISolicitacao[] = [solicitacao1, solicitacao2, solicitacao3, solicitacao4, solicitacao5, solicitacao6, solicitacao7, solicitacao8];

export function seedLocalStorage() {
  let clientesString = localStorage.getItem('clientes');
  let clientes: ICliente[] = clientesString ? JSON.parse(clientesString) : [];
  if (clientes.length === 0) 
    localStorage.setItem('clientes', JSON.stringify([...clientes, ...clientesSeed]));

  let funcionariosString = localStorage.getItem('funcionarios');
  let funcionarios: IFuncionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];
  if (funcionarios.length === 0)
    localStorage.setItem('funcionarios', JSON.stringify([...funcionarios, ...funcionariosSeed]));

  let solicitacoesString = localStorage.getItem('solicitacoes');
  let solicitacoes: IFuncionario[] = solicitacoesString ? JSON.parse(solicitacoesString) : [];
  if (solicitacoes.length === 0)
    localStorage.setItem('solicitacoes', JSON.stringify([...solicitacoes, ...solicitacoesSeed]));

  let categoriasString = localStorage.getItem('categorias');
  let categorias: IFuncionario[] = categoriasString ? JSON.parse(categoriasString) : [];
  if (categorias.length === 0)
    localStorage.setItem('categorias', JSON.stringify([...categorias, ...categoriasSeed]));
}
