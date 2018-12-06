import React, { Component } from 'react';
import { Dropdown as SemanticDropdown } from 'semantic-ui-react';
import * as style from '../../constants/style';
import { connect } from 'react-redux';
import { changeSorting  } from '../../actions/index';
import * as constants from '../../constants/constants';
import _ from 'lodash';

class Dropdown extends Component {
  render() {
    return(
      <SemanticDropdown
        style={style.css.searchBar.filter}
        button
        className='icon'
        floating
        labeled
        icon='filter'
        options={constants.properties}
        search
        defaultValue='0'
        onChange={(e, data) => {
          let option = _.find(data.options, ['value', data.value]);
          this.props.changeSorting({
            property: option,
            order: this.props.sorting.order
           });
        }}
        text={this.props.sorting.property.text}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    sorting: state.sorting
  }
}

const mapDispatchToProps = {
  changeSorting
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
