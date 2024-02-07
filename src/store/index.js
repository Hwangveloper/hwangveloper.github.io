import { combineReducers, configureStore } from '@reduxjs/toolkit';
import home from '../home/modules/slice';
import wow from '../worldOfWarcraft/modules/slice';


const store = configureStore({
  reducer: combineReducers({
    home,
    wow,
  }),
});

export default store;