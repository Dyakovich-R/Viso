import React, { useState } from 'react';
import { ReceptionList } from '../shared/reception-list';
import { ReceptionFilter } from '../shared/reception-Filter';
import { ReceptionPagination } from '../shared/reception-pagination';
import { fetchData } from '@/services/api';
import { useDebounce } from 'react-use';
import HomePage from './home-Page';
import { useRecipeStore } from '@/store/store';

const ReceptionsPage: React.FC = () => {
  const {
    recipes,
    setRecipes,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
  } = useRecipeStore();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const recipesPerPage = 9;

  useDebounce(
    () => {
      const cacheKey = `${selectedCategory}_${searchTerm}`;

      if (recipes[cacheKey]) {
        return;
      }

      setLoading(true);
      fetchData(searchTerm)
        .then(fetchedRecipes => {
          setRecipes(cacheKey, fetchedRecipes);
        })
        .finally(() => setLoading(false));
    },
    200,
    [selectedCategory, searchTerm],
  );

  const cachedRecipes = recipes[`${selectedCategory}_${searchTerm}`] || [];

  const filteredRecipes = selectedCategory
    ? cachedRecipes.filter(recipe => recipe.strCategory === selectedCategory)
    : cachedRecipes;

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage,
  );

  return (
    <>
      <HomePage
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      ) : (
        <div>
          <ReceptionFilter
            categories={[
              ...new Set(cachedRecipes.map(recipe => recipe.strCategory)),
            ]}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />

          <ReceptionList recipes={displayedRecipes} />

          <ReceptionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default ReceptionsPage;
