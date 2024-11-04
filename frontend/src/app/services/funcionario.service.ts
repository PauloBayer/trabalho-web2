import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Funcionario } from '../model/entities/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor() {}

  create(email: string, nome: string, dataNascimento: string, senha: string): Observable<null> {
    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: Funcionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];

    funcionarios.push({
      id: Math.random(),
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      senha: senha
    });

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    return of(null);
  }

  findById(id: number): Observable<Funcionario> {
    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: Funcionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];

    const funcionario = funcionarios.find(f => f.id === id);
    
    if (!funcionario)
      return throwError(() => new Error(`Funcionário com ID ${id} não encontrado.`));

    return of(funcionario);
  }

  findAll(): Observable<Funcionario[]> {
    let funcionariosString = localStorage.getItem('funcionarios');
    return of(funcionariosString ? JSON.parse(funcionariosString) : []);
  }
  
  deleteById(id: number): Observable<null> {
    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: Funcionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];

    const index = funcionarios.findIndex(f => f.id === id);
    if (index === -1)
      return throwError(() => new Error(`Funcionário com ID ${id} não encontrado para exclusão.`));

    funcionarios.splice(index, 1);
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    return of(null);
  }
  
  updateById(id: number, email: string, nome: string, dataNascimento: string, senha: string): Observable<null> {
    let funcionariosString = localStorage.getItem('funcionarios');
    let funcionarios: Funcionario[] = funcionariosString ? JSON.parse(funcionariosString) : [];

    const index = funcionarios.findIndex(f => f.id === id);
    if (index === -1)
      return throwError(() => new Error(`Funcionário com ID ${id} não encontrado para atualização.`));

    funcionarios[index] = {
      id,
      nome,
      email,
      dataNascimento,
      senha
    };

    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));

    return of(null);
  }
}
