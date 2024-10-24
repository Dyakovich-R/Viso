/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelectedRecipesStore } from '@/store/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Title } from './title';
import { Plus, Minus } from 'lucide-react';

export const ReceptionSelected: React.FC = () => {
  const { selectedRecipes, addToSelected, removeFromSelected } =
    useSelectedRecipesStore(state => state);
  const navigate = useNavigate();

  if (!selectedRecipes || selectedRecipes.length === 0) {
    return (
      <>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Title
          text="No selected receptions"
          size="sm"
        />
      </>
    );
  }

  const isRecipeSelected = (id: string) => {
    return selectedRecipes.some(recipe => recipe.idMeal === id);
  };

  return (
    <>
      <Button onClick={() => navigate(-1)}>Back</Button>

      <div className="selected-recipes">
        <Title
          text="Selected Receptions"
          size="sm"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedRecipes.map((recipe: any) => (
            <div
              key={recipe.idMeal}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <img
                className="w-full h-40 object-cover mb-2 rounded-lg"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <h2 className="text-xl font-bold mb-2">{recipe.strMeal}</h2>
              <p className="text-sm text-gray-500 mb-1">
                Category: {recipe.strCategory}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Area: {recipe.strArea}
              </p>

              <div className="flex justify-between items-center">
                <Button onClick={() => navigate(`/recipe/${recipe.idMeal}`)}>
                  View Details
                </Button>

                <Button
                  onClick={() =>
                    isRecipeSelected(recipe.idMeal)
                      ? removeFromSelected(recipe.idMeal)
                      : addToSelected(recipe)
                  }
                >
                  {isRecipeSelected(recipe.idMeal) ? (
                    <>
                      <Minus
                        size={20}
                        className="mr-1"
                      />
                      Remove
                    </>
                  ) : (
                    <>
                      <Plus
                        size={20}
                        className="mr-1"
                      />
                      Add to Selected
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
