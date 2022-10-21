import { configureStore } from '@reduxjs/toolkit';
import stretchesReducer from './reducers/stretchesReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    stretches: stretchesReducer,
    user: userReducer,
  },
});
export default store;
