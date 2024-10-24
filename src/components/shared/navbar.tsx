import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <>
      <nav className="flex my-4 mx-2 font-bold gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline'
              : 'text-gray-600 hover:text-blue-600 transition duration-300'
          }
        >
          All receptions
        </NavLink>
        <NavLink
          to="/recipe"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline'
              : 'text-gray-600 hover:text-blue-600 transition duration-300'
          }
        >
          Detail reception
        </NavLink>
        <NavLink
          to="/selected-recipes"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 underline'
              : 'text-gray-600 hover:text-blue-600 transition duration-300'
          }
        >
          Selected reception
        </NavLink>
      </nav>
    </>
  );
};
