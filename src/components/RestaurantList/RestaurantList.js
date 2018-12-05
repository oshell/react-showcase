import React, { Component, Fragment } from 'react';
import { Card, Header, Container } from 'semantic-ui-react';
import * as style from '../../constants/style';
import RestaurantListElement from '../RestaurantListElement/RestaurantListElement';
import { connect } from 'react-redux';
import { init } from '../../actions/index';

class RestaurantList extends Component {
  componentDidMount() {
    this.props.init();
  }

  renderCards() {
    // we cache the status to check if a sub heading has to be added
    let status = '';

    return this.props.restaurants.map((restaurant, key) => {
      let header = <Fragment></Fragment>;
      // add header if new status begins
      if (status !== restaurant.status) {
        status = restaurant.status;
        header = <Container>
          <Header style={style.css.restaurantList.header}>{status}</Header>
        </Container>;
      }

      let element = <RestaurantListElement element={restaurant} />;
      return <Fragment key={key}>{header}{element}</Fragment>;
    });
  }

  render() {
    //wait for restaurants to be loaded
    if (!this.props.restaurants.length) {
      return <Fragment></Fragment>;
    }

    return(
      <Card.Group>
        {this.renderCards()}
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  }
}

const mapDispatchToProps = { init };

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
