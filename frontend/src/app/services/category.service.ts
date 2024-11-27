// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CategoriaEquipamento } from '../model/entities/categoria-equipamento';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private localStorageKey = 'categorias';

  constructor() {}

  /** Get all categories from localStorage */
  getCategories(): Observable<CategoriaEquipamento[]> {
    const categories = localStorage.getItem(this.localStorageKey);

    return of(categories ? JSON.parse(categories) : []);
  }

  /** Add a new category to localStorage */
  addCategory(category: CategoriaEquipamento): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    const categories: CategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    
    // Check if the category name already exists to prevent duplicates
    const exists = categories.some((cat) => cat.nome === category.nome);

    if (!exists) {
      categories.push(category);
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
      return of(null);
    } else {
      return throwError(() => new Error('A category with this name already exists.'));
    }
  }

  /** Update an existing category in localStorage */
  updateCategory(updatedCategory: CategoriaEquipamento): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    let categories: CategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    
    categories = categories.map((category) =>
      category.nome === updatedCategory.nome ? updatedCategory : category
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    
    return of(null);
  }

  /** Delete a category from localStorage */
  deleteCategory(categoryName: string): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    let categories: CategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    categories = categories.filter(
      (category) => category.nome !== categoryName
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));

    return of(null);
  }
}
