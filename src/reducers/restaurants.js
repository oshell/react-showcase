import * as actions from '../actions/index';
import Utility from '../controller/Utility/Utility';

export const restaurants = (state = {}, action) => {
  switch (action.type) {
    case actions.INIT:
      return action.payload.restaurants;
    case actions.CHANGE_SORTING:
      return Utility.sort(
        state,
        action.payload.sorting.property.value,
        action.payload.sorting.order
      );
    case actions.SEARCH:
      return Utility.search(action.payload.term, state);
    case actions.TOGGLE_FAVORITE:
      return Utility.toggleFavorite(
        action.payload.element,
        state,
        action.payload.sorting
      );
    default:
      return state;
  }
};
