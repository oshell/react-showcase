// testing dependencies
import { expect } from 'chai';

// tested components
import Utility from '../../controller/Utility/Utility';
import restaurants from '../../data/restaurants';

//test data
import * as constants from '../../constants/constants';

describe('Utility', () => {
  it('status priorities set', () => {
    expect(Utility.getStatusPriorities().length).to.be.above(0);
  });
  it('favorite satus has highest priority', () => {
    let expectedIndex = Object.keys(constants.status).length -1;
    let priority = Utility.getStatusPriority(constants.status.FAVORITE);
    expect(priority).to.equal(expectedIndex);
  });
  it('restaurants are prepared correctly', () => {
    let prepared = Utility.prepareRestaurants(restaurants);
    // check if first is open and last is closed
    let firstElement = prepared[0];
    let lastElement = prepared[prepared.length-1];
    expect(firstElement.status).to.equal(constants.status.OPEN);
    expect(lastElement.status).to.equal(constants.status.CLOSED);

    let sortingValues = firstElement.sortingValues;
    expect(sortingValues.hasOwnProperty('topRestaurants')).to.be.equal(true);
    expect(firstElement.hasOwnProperty('priority')).to.be.equal(true);
  });
  it('sorting is working', () => {
    let prepared = Utility.prepareRestaurants(restaurants);
    // check if first is open and last is closed
    let firstElement = prepared[0];
    let lastElement = prepared[prepared.length-1];
    expect(firstElement.status).to.equal(constants.status.OPEN);
    expect(lastElement.status).to.equal(constants.status.CLOSED);

    let property = constants.properties[0].value;
    let sorted = Utility.sort(prepared, property, 'asc');
    let status = Utility.getStatusPriorities()[1];
    let checkValue = 0;

    for (let i = 0; i < sorted.length; i++) {
      if (status !== sorted[i].status) {
        checkValue = 0;
        status = sorted[i].status;
      }
      let value = sorted[i].sortingValues[property];
      expect(value).to.be.at.least(checkValue);
      checkValue = value;
    }
  });
  it('search is working', () => {
    let term = 'SuShi';
    let searched = Utility.search(term, restaurants);

    for (let i = 0; i < searched.length; i++) {
      let element = searched[i];
      if (element.name.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        expect(element.visible).to.be.equal(true);
      } else {
        expect(element.visible).to.be.equal(false);
      }
    }
  });
  it('toggle Favorite is working', () => {
    let sorting = {
      property: constants.properties[0],
      order: 'desc'
    }
    let restaurant = restaurants[0];
    let statusBefore = restaurant.status;
    expect(statusBefore).to.be.equal(constants.status.OPEN);
    let withFavorite = Utility.toggleFavorite(restaurant, restaurants, sorting);
    let firstElement = withFavorite[0];
    let statusAfter = firstElement.status;
    expect(statusAfter).to.be.equal(constants.status.FAVORITE);
  });
});
