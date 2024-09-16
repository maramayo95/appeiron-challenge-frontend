import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, Movies } from '@/app/types/movieTypes';
import { searchMoviesByTitle, getMoviesByGenre, getMoviesByRate, getMostPopularMovie, getMostPopularMovies, getTopRatedMovies, searchMovieById, getGenres } from '@/app/services/httpClient';
import { initialState } from './movieTypes';

// Thunks para realizar las operaciones asincrónicas
export const fetchMoviesByTitle = createAsyncThunk(
  'movies/fetchByTitle',
  async ({ query }: { query: string }, thunkAPI) => {
    try {
      return await searchMoviesByTitle(query);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching movies by title');
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchById',
  async ({ id }: { id: number }, thunkAPI) => {
    try {
      return await searchMovieById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching movie by ID');
    }
  }
);

export const fetchGenres = createAsyncThunk(
  'movies/fetchGenres',
  async (_, thunkAPI) => {
    try {
      return await getGenres();
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching genres');
    }
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchByGenre',
  async ({ genreId, year }: { genreId: string; year?: string }, thunkAPI) => {
    try {
      return await getMoviesByGenre(genreId, year);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching movies by genre');
    }
  }
);

export const fetchMoviesByRate = createAsyncThunk(
  'movies/fetchByRate',
  async (rate: number, thunkAPI) => {
    try {
      return await getMoviesByRate(rate);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching movies by rate');
    }
  }
);

export const fetchMostPopularMovie = createAsyncThunk(
  'movies/fetchMostPopularMovie',
  async (_, thunkAPI) => {
    try {
      return await getMostPopularMovie();
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching the most popular movie');
    }
  }
);

export const fetchMostPopularMovies = createAsyncThunk(
  'movies/fetchMostPopularMovies',
  async (_, thunkAPI) => {
    try {
      return await getMostPopularMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching popular movies');
    }
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (_, thunkAPI) => {
    try {
      return await getTopRatedMovies();
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching top rated movies');
    }
  }
);


const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action: PayloadAction<Movies>) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movieDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMoviesByRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByRate.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesByRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMostPopularMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostPopularMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movieDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchMostPopularMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMostPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostPopularMovies.fulfilled, (state, action: PayloadAction<Movies>) => {
        state.popularMovies = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchMostPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action: PayloadAction<Movies>) => {
        state.topRatedMovies = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default movieSlice.reducer;
