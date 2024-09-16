import { useState, useEffect } from "react";
import { getMoviesByGenre } from "../services/httpClient"; // Importa tu función de obtener películas por género
import { Movie } from "../types/movieTypes"; // Importa el tipo de datos para las películas

const useMoviesByGenre = (selectedGenre: number | "") => {
  const [moviesByGenre, setMoviesByGenre] = useState<Movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Verifica si hay un género seleccionado antes de hacer la llamada
        if (selectedGenre) {
          const results = await getMoviesByGenre(selectedGenre);
          setMoviesByGenre(results);
        }
      } catch (error) {
        setError("Error fetching movies by genre");
        console.error("Error fetching movies by genre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);

  return { moviesByGenre, error, loading };
};

export default useMoviesByGenre;
