import { Movie, Movies } from "@/app/types/movieTypes";

export interface MoviesState {
    searchResults: Movies;
    popularMovies: Movies;
    topRatedMovies: Movies;
    movieDetails: Movie | null;
    loading: boolean;
    error: string | null;
}

export const initialState: MoviesState = {
    topRatedMovies: {
        page: 1,
        results: [] // Inicializa como un array vacío
    },
    searchResults: {
        page: 1,
        results: [] // Inicializa como un array vacío
    },
    popularMovies: {
        page: 1,
        results: [] // Inicializa como un array vacío
    },
    movieDetails: null,
    loading: false,
    error: null,
};
