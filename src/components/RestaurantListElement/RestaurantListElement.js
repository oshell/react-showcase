import React from 'react';
import { Card } from 'semantic-ui-react';
import Description from '../../container/RestaurantListElement/Description';
import Header from './Header';
import * as style from '../../constants/style';

const RestaurantListElement = (props) => {
  // comes from RestaurantList and not from state
  let element = props.element;
  // search applies visibility to objects which is now used
  let elemStyle = element.visible ?
    style.css.restaurantListElement.visible :
    style.css.restaurantListElement.hidden;

  return(
    <Card
      style={elemStyle}
      fluid
      color='orange'
      header={<Header element={element} />}
      meta={element.status}
      description={<Description element={element} />}
      />
  );
}

export default RestaurantListElement;
