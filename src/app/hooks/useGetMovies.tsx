import { useState, useEffect } from 'react';
import { searchMoviesByTitleClient } from '../services/httpClient';
import { Movie } from '../types/movieTypes';

 interface UseGetMoviesParams {
    search: string;
  }

const useGetMovies = ({ search }: UseGetMoviesParams) => {
  const [data, setData] = useState<Movie[] | undefined>(undefined);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await searchMoviesByTitleClient(search);
        setData(movies); // Actualiza el estado con los resultados
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (search) { // Solo realiza la búsqueda si hay un término de búsqueda
      fetchMovies();
    }
  }, [search]);

  return {
    data,
  };
}

export default useGetMovies;
