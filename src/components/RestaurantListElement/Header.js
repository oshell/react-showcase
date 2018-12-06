import React, { Fragment } from 'react';
import Rating from './Rating';

const Header = (props) => {
  let rating = props.element.sortingValues.ratingAverage;

  return(
    <Fragment>
      <div>{props.element.name}</div>
      <Rating rating={rating} />
    </Fragment>
  );
}

export default Header;
