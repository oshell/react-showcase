// testing dependencies
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

// tested components
import RestaurantListElement from '../../components/RestaurantListElement/RestaurantListElement';
import { Card } from 'semantic-ui-react';

// test data
import restaurants from '../../data/restaurants';

Enzyme.configure({ adapter: new Adapter() });

describe('RestaurantListElement', () => {
  it('has Card', () => {
    const element = restaurants[0];
    const appComponent = Enzyme.shallow(<RestaurantListElement element={element} />);
    expect(appComponent.find(Card)).to.have.lengthOf(1);
  });
});
