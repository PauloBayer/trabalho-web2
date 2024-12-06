import { Cliente } from "../entities/cliente";
import { Funcionario } from "../entities/funcionario";

export class LoginResponse {
  token: string = '';
  role: string = '';
  user: Cliente | Funcionario | null = null;
}
