import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   stretchData: '',
  currentRegion: '',
  numberOfStretches: 1,
  loadingStretch: false,
  stretches: [],
};

export const stretchesSlice = createSlice({
  name: 'stretches',
  initialState,
  reducers: {
    setCurrentRegion: (state, action) => {
      state.currentRegion = action.payload;
    },
    setNumberOfStretches: (state, action) => {
      state.numberOfStretches = action.payload;
    },
    setLoadingStretch: (state, action) => {
      state.loadingStretch = action.payload;
    },
    setStretches: (state, action) => {
      state.stretches = [...state.stretches, action.payload];
    },
    clearStretches: (state) => {
      state.stretches = [];
    },
  },
});

export const {
  setCurrentRegion,
  setNumberOfStretches,
  setLoadingStretch,
  setStretches,
  clearStretches,
} = stretchesSlice.actions;

export default stretchesSlice.reducer;

// {type: setCurrentRegion, action: 'quads'}
