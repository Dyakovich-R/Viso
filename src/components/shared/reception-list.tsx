import React from 'react';
import { ReceptionCard } from './reception-card';
import { Recipe } from '@/types';


interface RecipeListProps {
  recipes: Recipe[]; 
}

export const ReceptionList: React.FC<RecipeListProps> = ({
  recipes,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-[50px]">
        {recipes.map(recipe => (
          <ReceptionCard
            key={recipe.idMeal}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  );
};
