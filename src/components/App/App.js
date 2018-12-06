import React from 'react';
import { Container } from 'semantic-ui-react'
import RestaurantList from '../../container/RestaurantList/RestaurantList';
import SearchBar from '../SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../store';

const App = () => {
  return(
    <Provider store={store}>
      <Container>
        <SearchBar />
        <RestaurantList />
      </Container>
    </Provider>
  );
}

export default App;
