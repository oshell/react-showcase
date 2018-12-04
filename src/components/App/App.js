import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import RestaurantList from '../RestaurantList/RestaurantList';
import SearchBar from '../SearchBar/SearchBar';
import Utility from './../../controller/Utility/Utility';
import _ from 'lodash';
import * as constants from './constants';
import restaurants from './restaurants';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      restaurantsByStatus: [],
      currentFilter: constants.filters[0],
      currentSorting: 'desc',
      searchTerm: ''
    }

    this.getRestaurants = this.getRestaurants.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleFavourite = this.toggleFavourite.bind(this);
    this.search = this.search.bind(this);
  }

  toggleFavourite(element) {
    //create copy of restaurants to work with, before changing state
    let restaurantsByStatus = Object.assign({}, this.state.restaurantsByStatus);

    //loop statuses to find where the selected element currently is
    for (let s in constants.status) {
      //status e.g. open/closed/favorite
      let status = constants.status[s];
      //get index of element so we can delete it
      let index = restaurantsByStatus[status].indexOf(element);
      //prepare filtering status after adding element
      let filterProp = this.state.currentFilter.value;
      let sorting = this.state.currentSorting;

      //if element is in current status array we will move it (delete/add)
      if (index > -1) {
        //favorite is special case because user selected
        if (status === constants.status.FAVORITE) {
          //remove restaurant from favorites
          restaurantsByStatus[constants.status.FAVORITE].splice(index, 1);
          //add restaurant to its inital opening state
          let elements = restaurantsByStatus[element.status];
          elements.push(element);
          //filter this opening state again
          elements = this.filterByStatus(elements, filterProp, sorting);
          //build final array for state
          restaurantsByStatus[element.status] = elements;

          this.setState({
            restaurantsByStatus: restaurantsByStatus
          });
          break;
        } else {
          //remove restaurant from opening state so we do not have duplicates
          restaurantsByStatus[status].splice(index, 1);
          //get favorites for editing before changing state
          let favorites = restaurantsByStatus[constants.status.FAVORITE];
          //add restaurant to favorites
          favorites.push(element);
          //filter favorites with current filter
          favorites = this.filterByStatus(favorites, filterProp, sorting);
          //build final array for state
          restaurantsByStatus[constants.status.FAVORITE] = favorites;

          this.setState({
            restaurantsByStatus: restaurantsByStatus
          });
          break;
        }
      }
    }
  }

  addCalculatedProperty(array) {
    for (let i = 0; i < array.length; i++) {
      let restaurant = array[i];
      let sortingValues = restaurant.sortingValues;
      let topRestaurants = (
        (sortingValues.distance * sortingValues.popularity)
        + sortingValues.ratingAverage
      );
      array[i].sortingValues.topRestaurants = topRestaurants;
    }
    return array;
  }

  getRestaurantBaseStructure() {
    let restaurantsByStatus = {
      [constants.status.FAVORITE]: [],
      [constants.status.OPEN]: [],
      [constants.status.AHEAD]: [],
      [constants.status.CLOSED]: []
    }
    return restaurantsByStatus;
  }

  getRestaurants() {
    // this should be an api call in a full stack application
    let restaurantsByStatus = this.getRestaurantBaseStructure();

    restaurantsByStatus = Utility.createPropertyGroups(
      restaurantsByStatus,
      restaurants,
      'status'
    );

    this.setState({restaurantsByStatus});
  }

  filterByStatus(array, property, sorting) {
    return _.orderBy(
      array,
      ['sortingValues.' + property],
      [sorting]
    );
  }

  filterRestaurants(property, sorting) {
    let favorite_restaurants = this.filterByStatus(
      this.state.restaurantsByStatus[constants.status.FAVORITE],
      property,
      sorting
    );
    let open_restaurants = this.filterByStatus(
      this.state.restaurantsByStatus[constants.status.OPEN],
      property,
      sorting
    );
    let ahead_restaurants = this.filterByStatus(
      this.state.restaurantsByStatus[constants.status.AHEAD],
      property,
      sorting
    );
    let closed_restaurants = this.filterByStatus(
      this.state.restaurantsByStatus[constants.status.CLOSED],
      property,
      sorting
    );

    this.setState({
      restaurantsByStatus: {
        [constants.status.FAVORITE]: favorite_restaurants,
        [constants.status.OPEN]: open_restaurants,
        [constants.status.AHEAD]: ahead_restaurants,
        [constants.status.CLOSED]: closed_restaurants
      },
      currentSorting: sorting
    });
  }

  search(term) {
    this.setState({
      searchTerm: term
    });
  }

  changeFilter(value) {
    const index = constants.filters.map(o => o.value).indexOf(value);
    this.setState({
      currentFilter: constants.filters[index]
    });
  }

  render() {
    return(
      <Container>
        <SearchBar
          search={this.search}
          changeFilter={this.changeFilter}
          filters={constants.filters}
          currentFilter={this.state.currentFilter}
          filterRestaurants={this.filterRestaurants} />
        <RestaurantList
          searchTerm={this.state.searchTerm}
          toggleFavourite={this.toggleFavourite}
          currentFilter={this.state.currentFilter}
          getRestaurants={this.getRestaurants}
          restaurantsByStatus={this.state.restaurantsByStatus} />
      </Container>
    );
  }
}

export default App;
