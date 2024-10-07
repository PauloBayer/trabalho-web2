import { ICategoriaEquipamento } from "../interfaces/categoria-equipamento.interface";

export class Categoria implements ICategoriaEquipamento {
    name: string = '';
    description: string = '';

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}