// store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  items: string[]; // Suponiendo que los favoritos son una lista de IDs o nombres
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item !== action.payload);
    },
    setFavorites(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
