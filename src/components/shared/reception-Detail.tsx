/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Recipe } from '@/types';

type RecipeDetailProps = {
  recipe: Recipe | any;
};

export const ReceptionDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        Back
      </Button>

      <h1 className="text-2xl font-bold mb-4">Details Reception</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <img
          className="w-[215px] h-[215px] object-cover rounded-lg mb-4"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
        <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
        <p className="text-sm text-gray-500 mb-2">Area: {recipe.strArea}</p>
        <p className="text-base mb-4">{recipe.strInstructions}</p>
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {Array.from({ length: 20 }, (_, i) =>
            recipe[`strIngredient${i + 1}`] ? (
              <li
                key={i}
                className="mb-1"
              >
                {recipe[`strIngredient${i + 1}`]} -{' '}
                {recipe[`strMeasure${i + 1}`]}
              </li>
            ) : null,
          )}
        </ul>
      </div>
    </div>
  );
};
