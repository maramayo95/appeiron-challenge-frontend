import { useState } from 'react';

// Define el tipo del hook
interface UseSearch {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (value: string) => void;
}

const useSearch = (): UseSearch => {
  const [search, setSearch] = useState<string>(''); 

  const handleSearchChange = (value: string) => {
    setSearch(value); 
  };

  return {
    search,
    setSearch,
    handleSearchChange,
  };
};

export default useSearch;
