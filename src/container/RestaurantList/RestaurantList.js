import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react';
import Header from '../../components/RestaurantList/Header';
import RestaurantListElement from '../../components/RestaurantListElement/RestaurantListElement';
import { connect } from 'react-redux';
import { init } from '../../actions/index';

class RestaurantList extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    //wait for restaurants to be loaded
    if (!this.props.restaurants.length) {
      return <Fragment></Fragment>;
    }
    // we cache the status to check if a sub heading has to be added
    let status = '';

    let cards = this.props.restaurants.map((restaurant, key) => {
      let header = <Fragment></Fragment>;
      // add header if new status begins
      if (status !== restaurant.status) {
        status = restaurant.status;
        header = <Header status={status} />;
      }

      return (
      <Fragment key={key}>
        {header}
         <RestaurantListElement element={restaurant} />
      </Fragment>);
    });

    return(
      <Card.Group>
        {cards}
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
