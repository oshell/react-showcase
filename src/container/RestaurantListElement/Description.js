import React, { Component, Fragment } from 'react';
import Button from './Button';
import * as constants from '../../constants/constants';
import { connect } from 'react-redux';

class Description extends Component {
  render() {
    // change display of price values
    let sortingValue = this.props.sorting.property.value;
    let value = this.props.element.sortingValues[sortingValue];

    if (constants.cashFilters.includes(sortingValue)) {
      value = value/100;
    }

    return(
      <Fragment>
        <div>{this.props.sorting.property.text + ': ' + value}</div>
        <Button element={this.props.element} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    sorting: state.sorting,
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
