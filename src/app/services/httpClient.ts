import axios from "axios";
import { Movies, Movie, Genre, Video } from "../types/movieTypes";
import { MovieCast } from "../types/castTypes";

// Configura tu token Bearer aquí o en variables de entorno
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const BASE_URL = process.env.BASE_URL;

const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL;
const BEARER_TOKEN_CLIENT = process.env.NEXT_PUBLIC_BEARER_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const searchMoviesByTitleClient = async (
  query: string
): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL_CLIENT}/search/movie`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN_CLIENT}`,
      },
      params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, // Incluye la clave API si es necesario para tu consulta
        query,
      },
    });
    return response.data.results; // La respuesta de la API tiene la lista de películas en la propiedad "results"
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const searchMoviesByTitle = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get("/search/movie", {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieCast = async (id: number): Promise<MovieCast> => {
  const response = await axiosInstance.get(`/movie/${id}/credits`);
  return response.data;
};

export const searchMovieById = async (id: number): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movie/${id}`);
  return response.data;
};

export const getSimilarMovies = async (id: number): Promise<Movies> => {
  const response = await axiosInstance.get<Movies>(`/movie/${id}/similar`);
  return response.data;
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${BASE_URL_CLIENT}/genre/movie/list`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN_CLIENT}`, // Incluye el Bearer Token
      },
      params: {
        language: "en-US",
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error; // Propaga el error para que pueda ser manejado por el llamador
  }
};

// Buscar por género y año
export const getMoviesByGenre = async (genreId: Number): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movies>(
      `${BASE_URL_CLIENT}/discover/movie`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN_CLIENT}`, // Incluye el Bearer Token
        },
        params: {
          with_genres: genreId,

          language: "en-US",
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    throw error; // Propaga el error para que pueda ser manejado por el llamador
  }
};

export const getMoviesByRate = async (rate: number): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movies>("/discover/movie", {
    params: {
      vote_average_gte: rate,
    },
  });
  return response.data.results;
};

export const getMostPopularMovie = async (): Promise<Movie> => {
  const response = await axiosInstance.get<Movies>("/movie/popular");
  return response.data.results[0];
};

export const getMostPopularMovies = async (): Promise<Movies> => {
  const response = await axiosInstance.get<Movies>("/movie/popular");
  return {
    page: response.data.page,
    results: response.data.results,
  };
};

export const getTopRatedMovies = async (): Promise<Movies> => {
  const response = await axiosInstance.get<Movies>("/movie/top_rated");
  return {
    page: response.data.page,
    results: response.data.results,
  };
};

export const getMovieTrailer = async (
  id: number
): Promise<Video | undefined> => {
  try {
    const response = await axiosInstance.get<{ results: Video[] }>(
      `/movie/${id}/videos`
    );
    const videos = response.data.results;

    const trailer = videos.find(
      (video: Video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return undefined;
  }
};
