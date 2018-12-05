import _ from 'lodash';
import * as constants from '../../constants/constants';

export default class Utility {
  /**
    * returns array of statuses to define the priority in the list.
    * the index defines the order. lower index means less priority.
    **/
  static getStatusPriorities() {
    return [
      constants.status.CLOSED,
      constants.status.AHEAD,
      constants.status.OPEN,
      constants.status.FAVORITE
    ];
  }

  // get the priority (int) of a given status
  static getStatusPriority(status) {
    let priorities = this.getStatusPriorities();
    return priorities.indexOf(status);
  }

  // sorting the restaurants - status/priority is always the first prop
  static sort(arr, key, order) {
    return _.orderBy(
      arr,
      ['priority', 'sortingValues.' + key],
      ['desc', order]
    );
  }

  /**
    * Prepare restaurants for the app - including:
    *   - a calculated property topRestaurants
    *   - adding visibility property for frontend search
    *   - adding a property (number) to define priority of status
    *   - initial sorting
    **/
  static prepareRestaurants(restaurants) {
    let modified = restaurants;
    let firstRestaurant = restaurants[0];
    let sortingValueKeys = Object.keys(firstRestaurant.sortingValues);
    let firstKey = sortingValueKeys[0];
    let initialOrder = 'desc';

    modified = this.addCalculatedProperty(modified);
    modified = this.addPredefinedProperty(
      modified,
      'visible',
       true
     );
     modified = this.addSortingProperties(modified);
     modified = this.sort(modified, firstKey, initialOrder);
     return modified;
  }

  /** Status should just be a number mapped in getStatusPriorities.
    * Afterwards we can simply use _lodash to sort.
  **/
  static addSortingProperties(restaurants) {
    let modified = [];

    for (let i = 0; i < restaurants.length; i++) {
      let restaurant = restaurants[i];
      let statusPriorities = this.getStatusPriorities();

      for (let k = 0; k < statusPriorities.length; k++) {
        if (restaurant.status === statusPriorities[k]) {
          restaurant.priority = k;
        }
      }

      modified.push(restaurant);
    }
    return modified;
  }

  static addCalculatedProperty(array) {
    let modified = [];

    for (let i = 0; i < array.length; i++) {
      let restaurant = array[i];
      let sortingValues = restaurant.sortingValues;
      let topRestaurants = (
        (sortingValues.distance * sortingValues.popularity)
        + sortingValues.ratingAverage
      );
      restaurant.sortingValues.topRestaurants = topRestaurants;
      modified.push(restaurant);
    }
    return modified;
  }

  static addPredefinedProperty(arr, property, value) {
    let modified = [];

    for (let i=0; i < arr.length; i++) {
      let obj = arr[i];
      obj[property] = value;
      modified.push(obj);
    }

    return modified;
  }

  static search(term, restaurants) {
    return restaurants.map((restaurant) => {
      let modified = {};
      if(restaurant.name.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        // syntax is needed to trigger change in redux store
        modified = {
          ...restaurant,
          visible: true
        }
      } else {
        modified = {
          ...restaurant,
          visible: false
        }
      }
      return modified
    });
  }

  static toggleFavorite(element, restaurants, sorting) {
    let modified = restaurants.slice();
    let index = modified.indexOf(element);
    let isFavorite = element.status ===  constants.status.FAVORITE;
    let priorityNum = 0;
    let modifiedElement = {};

    if (isFavorite) {
      element.status = element.statusCache;
    } else {
      element.statusCache = element.status;
      element.status = constants.status.FAVORITE;
    }

    priorityNum = this.getStatusPriority(element.status);
    // syntax is needed to trigger change in redux store
    modifiedElement = {
      ...element,
      priority: priorityNum
    }

    if (index !== -1) {
        modified[index] = modifiedElement;
    }

    modified = this.sort(modified, sorting.property.value, sorting.order);
    return modified;
  }
}
