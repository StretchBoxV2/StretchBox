import { configureStore } from '@reduxjs/toolkit';
import stretchesReducer from './reducers/stretchesReducer';

export const store = configureStore({
  reducer: {
    stretches: stretchesReducer,
  },
});
export default store;
