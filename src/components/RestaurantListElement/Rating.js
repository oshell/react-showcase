import React from 'react';
import StarRatings from 'react-star-ratings';

const Rating = (props) => {
  return(
    <StarRatings
      rating={props.rating}
      starRatedColor='orange'
      numberOfStars={5}
      name='rating'
      starDimension='15px'
      starSpacing='3px'
    />
  );
}

export default Rating;
