import { combineReducers } from 'redux';
import appSlice from './appSlice';
import weatherSlice from './weatherSlice';
import favoriteLocationSlice from './favoriteLocationSlice';

export const reducres = combineReducers({
  weatherReducer: weatherSlice,
  appSlice: appSlice,
  favoriteLocationSlice,
});
