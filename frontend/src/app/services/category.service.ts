// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { ICategoriaEquipamento } from '../model/entities/categoria-equipamento.interface';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private localStorageKey = 'categories';

  constructor() {}

  /** Get all categories from localStorage */
  getCategories(): Observable<ICategoriaEquipamento[]> {
    const categories = localStorage.getItem(this.localStorageKey);
    return of(categories ? JSON.parse(categories) : []);
  }

  /** Add a new category to localStorage */
  addCategory(category: ICategoriaEquipamento): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    const categories: ICategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    
    // Check if the category name already exists to prevent duplicates
    const exists = categories.some((cat) => cat.name === category.name);

    if (!exists) {
      categories.push(category);
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
      return of(null);
    } else {
      return throwError(() => new Error('A category with this name already exists.'));
    }
  }

  /** Update an existing category in localStorage */
  updateCategory(updatedCategory: ICategoriaEquipamento): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    let categories: ICategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    
    categories = categories.map((category) =>
      category.name === updatedCategory.name ? updatedCategory : category
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    return of(null);
  }

  /** Delete a category from localStorage */
  deleteCategory(categoryName: string): Observable<null> {
    const categoriesString = localStorage.getItem(this.localStorageKey);
    let categories: ICategoriaEquipamento [] = categoriesString ? JSON.parse(categoriesString) : [];
    categories = categories.filter(
      (category) => category.name !== categoryName
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    return of(null);
  }
}
