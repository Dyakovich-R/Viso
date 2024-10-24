import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

type RecipePaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const ReceptionPagination: React.FC<RecipePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 7 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={cn(
              'px-3 py-1 mx-1 rounded',
              currentPage === i
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300',
            )}
          >
            {i}
          </button>,
        );
      } else if (i === 8) {
        pages.push(
          <span
            key="ellipsis"
            className="px-3 py-1 mx-1"
          >
            ...
          </span>,
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 my-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'px-3 py-1 rounded',
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300',
        )}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      {renderPages()}
      <button
        onClick={() => onPageChange(currentPage +1)}
        disabled={currentPage === totalPages}
        className={cn(
          'px-3 py-1 rounded',
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300',
        )}
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
