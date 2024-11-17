import { Injectable } from '@angular/core';
import { CategoriaEquipamento } from '../model/entities/categoria-equipamento';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor() { }

  getAllCategories(): CategoriaEquipamento[] {
    return JSON.parse(localStorage.getItem('categorias') || '[]');
  }
}
