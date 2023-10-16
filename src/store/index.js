import { combineReducers, configureStore } from '@reduxjs/toolkit'
import home from '../home/modules/reducer'


const store = configureStore({
  reducer: combineReducers({
    home,
  }),
});

export default store;