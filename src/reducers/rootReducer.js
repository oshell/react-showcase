import { combineReducers } from 'redux';
import { sorting } from './sorting';
import { restaurants } from './restaurants';

export const rootReducer = combineReducers({
  restaurants,
  sorting,
});
