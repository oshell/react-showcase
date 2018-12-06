// testing dependencies
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { connect } from 'react-redux';
import { mountWithStore, shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';

// tested components
import RestaurantList from '../../container/RestaurantList/RestaurantList';
import RestaurantListElement from '../../components/RestaurantListElement/RestaurantListElement';

// test data
import restaurants from '../../data/restaurants';
import * as constants from '../../constants/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('RestaurantList', () => {
  const ReactComponent = () => (<RestaurantList />);

  it('cards rendered correctly', () => {
    const expectedState = {
      restaurants: restaurants,
      sorting: {
        property: constants.properties[0],
        order: 'desc'
      }
    };
    const mapStateToProps = (state) => ({
      restaurants: expectedState.restaurants,
      sorting: expectedState.sorting
    });
    const ConnectedComponent = connect(mapStateToProps)(ReactComponent);
    const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
    expect(component.props().restaurants).to.equal(expectedState.restaurants);
    expect(component.props().sorting).to.equal(expectedState.sorting);

    let expectedLength = expectedState.restaurants.length;
    const mounted = mountWithStore(<ConnectedComponent />, createMockStore(expectedState));
    expect(mounted.find(RestaurantListElement)).to.have.lengthOf(expectedLength);
  });
});
