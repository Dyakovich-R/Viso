/* eslint-disable @typescript-eslint/no-explicit-any */
import { Recipe } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedRecipesState {
  selectedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  addToSelected: (recipe: Recipe) => void;
  clearRecipes: () => void;
  removeFromSelected: (recipeId: string) => void;
}

export const useSelectedRecipesStore = create<SelectedRecipesState>()(
  persist(
    set => ({
      selectedRecipes: [],

      addRecipe: recipe =>
        set(state => {
          if (!state.selectedRecipes.some(r => r.idMeal === recipe.idMeal)) {
            return { selectedRecipes: [...state.selectedRecipes, recipe] };
          }
          return state;
        }),
      addToSelected: recipe =>
        set(state => ({
          selectedRecipes: [...state.selectedRecipes, recipe],
        })),


      removeFromSelected: (recipeId: string) =>
        set(state => ({
          selectedRecipes: state.selectedRecipes.filter(
            recipe => recipe.idMeal !== recipeId,
          ),
        })),

      clearRecipes: () => set({ selectedRecipes: [] }),
    }),

    {
      name: 'selected-recipes-storage', 
    },
  ),
);

interface RecipeStore {
  recipes: Record<string, any[]>; 
  setRecipes: (key: string, recipes: any[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useRecipeStore = create<RecipeStore>(set => ({
  recipes: {}, 
  setRecipes: (key, recipes) =>
    set(state => ({
      recipes: { ...state.recipes, [key]: recipes },
    })),
  selectedCategory: '',
  setSelectedCategory: category => set({ selectedCategory: category }),
  searchTerm: '',
  setSearchTerm: term => set({ searchTerm: term }),
}));
