import { combineReducers } from '@reduxjs/toolkit';
import movieReducer from './movies/movieSlice';
import favoritesReducer from './favourites/favouritesSlice';
import darkModeReducer from './darkMode/darkModeSlice';
import searchReducer from './search/searchSlice';

const rootReducer = combineReducers({
  movies: movieReducer,
  darkMode: darkModeReducer,
  favorites: favoritesReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
