import React from "react";

interface SearchFilterProps {
  onFilterChange: (filter: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center">
        <input
          type="radio"
          id="filter-title"
          name="search-filter"
          value="title"
          onChange={(e) => onFilterChange(e.target.value)}
          className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
        />
        <label htmlFor="filter-title" className="ml-2 text-gray-400 text-base">
          Search by Title
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="radio"
          id="filter-genre"
          name="search-filter"
          value="genre"
          onChange={(e) => onFilterChange(e.target.value)}
          className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
        />
        <label htmlFor="filter-genre" className="ml-2 text-gray-400 text-base">
          Search by Genre
        </label>
      </div>
    </div>
  );
};

export default SearchFilter;
