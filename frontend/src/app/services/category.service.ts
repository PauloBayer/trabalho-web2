// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { ICategoriaEquipamento } from '../model/interfaces/categoria-equipamento.interface';
import { Categoria } from '../model/classes/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private localStorageKey = 'categories';

  constructor() {}

  /** Get all categories from localStorage */
  getCategories(): Categoria[] {
    const categories = localStorage.getItem(this.localStorageKey);
    return categories ? JSON.parse(categories) : [];
  }

  /** Add a new category to localStorage */
  addCategory(category: Categoria): void {
    const categories = this.getCategories();
    // Check if the category name already exists to prevent duplicates
    const exists = categories.some((cat) => cat.name === category.name);
    if (!exists) {
      categories.push(category);
      localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
    } else {
      alert('A category with this name already exists.');
    }
  }

  /** Update an existing category in localStorage */
  updateCategory(updatedCategory: Categoria): void {
    let categories = this.getCategories();
    categories = categories.map((category) =>
      category.name === updatedCategory.name ? updatedCategory : category
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }

  /** Delete a category from localStorage */
  deleteCategory(categoryName: string): void {
    const categories = this.getCategories().filter(
      (category) => category.name !== categoryName
    );
    localStorage.setItem(this.localStorageKey, JSON.stringify(categories));
  }
}
