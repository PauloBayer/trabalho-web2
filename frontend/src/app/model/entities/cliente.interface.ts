export interface ICliente {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
  cep: string;
  senha?: string;
}
