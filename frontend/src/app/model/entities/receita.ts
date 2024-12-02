import { CategoriaEquipamento } from "./categoria-equipamento";

export class Receita {
    categoria: CategoriaEquipamento = new CategoriaEquipamento();
    dataHoraCriacao: number[] = [];
    valor: number = 0;
  }