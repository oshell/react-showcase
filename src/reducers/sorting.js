import * as actions from '../actions/index';
import * as constants from '../constants/constants';

let initialSorting = {
  property: constants.properties[0],
  order: 'desc'
};

export const sorting = (state = initialSorting, action) => {
  switch (action.type) {
    case actions.CHANGE_SORTING:
      return action.payload.sorting;
    default:
      return state;
  }
};
