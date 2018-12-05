import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';
import * as style from '../../constants/style';
import * as constants from '../../constants/constants';
import { toggleFavorite } from '../../actions/index';
import { connect } from 'react-redux';


class RestaurantListElement extends Component {
  handleClick(element) {
    this.props.toggleFavorite(
      element,
      this.props.sorting
     );
  }

  renderButton(element) {
    let isFavorite = element.status === constants.status.FAVORITE;
    let cssClass = isFavorite ? 'heart icon' : 'heart outline icon';

    let favouriteButton = <button className="ui icon button"
          style={style.css.restaurantListElement.button}
          onClick={() => { return this.handleClick(element)}}>
          <i className={cssClass}></i>
      </button>;

    return favouriteButton;
  }

  renderFilterValue(element) {
    // change display of price values
    let value = element.sortingValues[this.props.sorting.property.value];
    if (constants.cashFilters.includes(this.props.sorting.property.value)) {
      value = value/100;
    }

    let filterValue = <div>
      {this.props.sorting.property.text + ': ' + value}
    </div>;

    return filterValue;
  }

  renderDescription(element) {
    let filterValue = this.renderFilterValue(element);
    let favouriteButton = this.renderButton(element);
    return <Fragment>{filterValue} {favouriteButton}</Fragment>;
  }

  renderHeader(element) {
    let name = <div>{element.name}</div>;
    let rating = <div style={style.css.restaurantListElement.rating}>
      <StarRatings
        rating={element.sortingValues.ratingAverage}
        starRatedColor='orange'
        numberOfStars={5}
        name='rating'
        starDimension='15px'
        starSpacing='3px'
      /></div>;
    return <Fragment>{name}{rating}</Fragment>;
  }

  render() {
    // comes from RestaurantList and not from state
    let element = this.props.element;

    // search applies visibility to objects which is now used
    let elemStyle = element.visible ? style.css.restaurantListElement.visible : style.css.restaurantListElement.hidden;

    return(
      <Card
        style={elemStyle}
        fluid
        color='orange'
        header={() => {return this.renderHeader(element)}}
        meta={element.status}
        description={() => {return this.renderDescription(element)}}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    sorting: state.sorting,
  }
}

const mapDispatchToProps = { toggleFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListElement);
