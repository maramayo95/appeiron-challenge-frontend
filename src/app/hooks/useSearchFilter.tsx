import { useState } from "react";

const useSearchFilter = () => {
  const [filter, setFilter] = useState<string>("title"); // Filtro por defecto

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return {
    filter,
    handleFilterChange,
  };
};

export default useSearchFilter;
