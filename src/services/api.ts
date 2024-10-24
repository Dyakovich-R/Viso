import { CombinedRecipe } from '@/types';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}categories.php`);
  const data = await response.json();
  return data.categories;
};
export const fetchArea = async () => {
  const response = await fetch(`${API_URL}list.php?a=list`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealsByCategory = async (category: string) => {
  const response = await fetch(`${API_URL}filter.php?c=${category}`);
  const data = await response.json();
  return data.meals;
};

export const fetchMealDetails = async (mealId: string) => {
  const response = await fetch(`${API_URL}lookup.php?i=${mealId}`);
  const data = await response.json();
  return data.meals[0]; 
};


export const fetchData = async (
  searchTerm: string = '',
): Promise<CombinedRecipe[]> => {
  const categoriesData = await fetchCategories();

  const allMeals: CombinedRecipe[] = [];
  for (const category of categoriesData) {
    const mealsData = await fetchMealsByCategory(category.strCategory);

    for (const meal of mealsData) {
      const mealDetails = await fetchMealDetails(meal.idMeal);

      const combinedData: CombinedRecipe = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: category.strCategory, 
        strDescription: category.strCategoryDescription || '',
        strArea: mealDetails.strArea || 'Unknown',
      };

      allMeals.push(combinedData);
    }
  }

  if (searchTerm) {
    return allMeals.filter(meal =>
      meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  return allMeals;
};