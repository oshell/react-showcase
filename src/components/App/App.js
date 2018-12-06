import React from 'react';
import { Container } from 'semantic-ui-react'
import RestaurantList from '../../container/RestaurantList/RestaurantList';
import SearchBar from '../SearchBar/SearchBar';

const App = () => {
  return(
    <Container>
      <SearchBar />
      <RestaurantList />
    </Container>
  );
}

export default App;
