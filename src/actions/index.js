import Utility from './../controller/Utility/Utility';
import restaurants from '../data/restaurants';

export const INIT = 'INIT';
export const TOGGLE_FAVORITE= 'TOGGLE_FAVORITE';
export const SEARCH = 'SEARCH';
export const CHANGE_SORTING = 'CHANGE_SORTING';

let initialRestaurants = getRestaurants();

export const init = () => ({
  type: INIT,
  payload: {restaurants: initialRestaurants}
});

export const toggleFavorite = (element, sorting) => ({
  type: TOGGLE_FAVORITE,
  payload: {element, sorting}
});

export const search = (term) => ({
  type: SEARCH,
  payload: {term}
});

export const changeSorting = (sorting) => ({
  type: CHANGE_SORTING,
  payload: {sorting}
});

function getRestaurants() {
  // this should be an api call in a full stack application
  let prepared = Utility.prepareRestaurants(restaurants);
  return prepared;
}
