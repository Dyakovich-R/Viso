import React from 'react';
import { Title } from './title';
import { Plus, Minus } from 'lucide-react';
import { Button } from '../ui/button';
import { NavLink } from 'react-router-dom';
import { useSelectedRecipesStore } from '@/store/store';
import { CombinedRecipe } from '@/types';


interface Props {
  recipe: CombinedRecipe; 
  className?: string;
}

export const ReceptionCard: React.FC<Props> = ({ recipe, className }) => {
  const { selectedRecipes, addToSelected, removeFromSelected } =
    useSelectedRecipesStore(state => state);

  const isSelected = selectedRecipes.some(
    selected => selected.idMeal === recipe.idMeal,
  );

  const onToggleSelected = () => {
    if (isSelected) {
      removeFromSelected(recipe.idMeal);
    } else {
      addToSelected(recipe); 
    }
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}
    >
      <div className="flex justify-center p-6 bg-gray-100 rounded-lg h-[260px]">
        <img
          className="w-[215px] h-[215px] object-cover"
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />
      </div>

      <div className="p-4">
        <Title
          text={recipe.strMeal}
          size="sm"
          className="mb-1 font-bold"
        />
        <p className="text-sm text-gray-500">Category: {recipe.strCategory}</p>
        <p className="text-sm text-gray-500">Area: {recipe.strArea}</p>
        {recipe.strDescription && (
          <p className="text-sm text-gray-500">
            Description: {recipe.strDescription}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <NavLink to={`/recipe/${recipe.idMeal}`}>
          <Button>Details</Button>
        </NavLink>

        <Button
          variant="secondary"
          className="flex items-center text-base font-bold bg-gray-200 hover:bg-gray-300"
          onClick={onToggleSelected} 
        >
          {isSelected ? (
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
  );
};
