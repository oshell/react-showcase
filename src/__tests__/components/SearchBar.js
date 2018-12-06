// testing dependencies
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

// tested components
import SearchBar from '../../components/SearchBar/SearchBar';
import Input from '../../container/SearchBar/Input';
import Dropdown from '../../container/SearchBar/Dropdown';
import Button from '../../container/SearchBar/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('Searchbar', () => {
  it('has Input, Dropdown, Button', () => {
    const appComponent = Enzyme.shallow(<SearchBar />);
    expect(appComponent.find(Input)).to.have.lengthOf(1);
    expect(appComponent.find(Dropdown)).to.have.lengthOf(1);
    expect(appComponent.find(Button)).to.have.lengthOf(1);
  });
});
