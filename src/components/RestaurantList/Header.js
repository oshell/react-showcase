import React from 'react';
import { Header as SemanticHeader, Container } from 'semantic-ui-react';
import * as style from '../../constants/style';

const Header = (props) => {
  return(
    <Container>
      <SemanticHeader style={style.css.restaurantList.header}>
        {props.status}
      </SemanticHeader>
    </Container>
  );
}

export default Header;
