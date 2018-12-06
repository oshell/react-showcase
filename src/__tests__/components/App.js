// testing dependencies
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

// tested components
import App from '../../components/App/App';
import SearchBar from '../../components/SearchBar/SearchBar';
import RestaurantList from '../../container/RestaurantList/RestaurantList';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('has SearchBar and RestaurantList', () => {
    const appComponent = Enzyme.shallow(<App />);
    expect(appComponent.find(SearchBar)).to.have.lengthOf(1);
    expect(appComponent.find(RestaurantList)).to.have.lengthOf(1);
  });
});
