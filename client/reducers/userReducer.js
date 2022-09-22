import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  favorites: [],
  isViewingFavorites: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      (state.user = null), (state.favorites = []);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (stretch) => stretch._id !== action.payload
      );
    },
    toggleViewingFavorites: (state) => {
      state.isViewingFavorites = !state.isViewingFavorites;
    },
  },
});

export const {
  setUser,
  clearUser,
  setError,
  setFavorites,
  addFavorite,
  removeFavorite,
  toggleViewingFavorites,
} = userSlice.actions;
export default userSlice.reducer;
