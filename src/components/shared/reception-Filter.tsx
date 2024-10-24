import React from 'react';

type RecipeFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
};

export const ReceptionFilter: React.FC<RecipeFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="recipe-filter mb-4 flex">
      <select
        value={selectedCategory}
        onChange={e => onCategorySelect(e.target.value)}
      
      >
        <option value="">All categories</option>
        {categories.map(category => (
          <option
            key={category}
            value={category}
          >
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
