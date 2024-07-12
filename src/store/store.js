import { configureStore } from '@reduxjs/toolkit';
import playerControllerReducer from '../reducers/index';

const store = configureStore({
  reducer: playerControllerReducer,
});

export default store;