import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReceptionDetail } from '../shared/reception-Detail';
import { fetchMealDetails} from '@/services/api';
import { Recipe } from '@/types';

const ReceptionPage: React.FC = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchMealDetails(`${id}`).then(setRecipe);
  }, [id]);

  return recipe ? <ReceptionDetail recipe={recipe} /> : <div>Loading...</div>;
};

export default ReceptionPage;
