import { combineReducers, configureStore } from '@reduxjs/toolkit';
import home from '../home/modules/slice';
import wow from '../worldOfWarcraft/modules/slice';
import project from '../project/modules/slice';


const store = configureStore({
  reducer: combineReducers({
    home,
    wow,
    project,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;