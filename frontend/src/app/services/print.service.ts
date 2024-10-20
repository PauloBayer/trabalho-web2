import { Injectable } from '@angular/core';
import { Receita } from '../model/entities/receita';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  private dataToPrint: Receita[] = [];

  constructor() {}

  setPrintData(data: Receita[]) {
    this.dataToPrint = data;
  }

  getPrintData(): Receita[] {
    return this.dataToPrint;
  }
}
