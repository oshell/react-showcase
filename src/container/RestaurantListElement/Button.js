import React, { Component } from 'react';
import * as style from '../../constants/style';
import * as constants from '../../constants/constants';
import { toggleFavorite } from '../../actions/index';
import { connect } from 'react-redux';

class Button extends Component {
  handleClick(element) {
    this.props.toggleFavorite(
      element,
      this.props.sorting
     );
  }

  render() {
    let isFavorite = this.props.element.status === constants.status.FAVORITE;
    let cssClass = isFavorite ? 'heart icon' : 'heart outline icon';

    let favouriteButton = <button className="ui icon button"
          style={style.css.restaurantListElement.button}
          onClick={() => { return this.handleClick(this.props.element)}}>
          <i className={cssClass}></i>
      </button>;

    return favouriteButton;
  }
}

const mapStateToProps = state => {
  return {
    sorting: state.sorting
  };
}

const mapDispatchToProps = { toggleFavorite };

export default connect(mapStateToProps, mapDispatchToProps)(Button);
