import {useState, useEffect} from 'react'
import { Genre } from '../types/movieTypes';
import { getGenres } from '../services/httpClient';

const useSelectGenre = () => {
    const [genresOptions, setGenresOptions] = useState<Genre[] | []>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | "">(""); // A single selected genre

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(parseInt(event.target.value) || "");
  };
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genres = await getGenres();
        setGenresOptions(genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
   {
        genresOptions, setGenresOptions, selectedGenre, handleGenreChange
   }
  )
}

export default useSelectGenre