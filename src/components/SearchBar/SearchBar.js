import React, { Component } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import * as style from '../../constants/style';
import { connect } from 'react-redux';
import { search, changeSorting  } from '../../actions/index';
import * as constants from '../../constants/constants';
import _ from 'lodash';

class SearchBar extends Component {
  renderInput() {
    return <Input
      onChange={(e) => {this.props.search(e.target.value);}}
      placeholder='Search...' />;
  }

  renderDropdown() {
    return <Dropdown
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
  }

  renderButton() {
    return <button className="ui icon button"
      style={style.css.searchBar.filter}
      onClick={()=>{
        // cache var, since accessing right after setting will cause bugs
        let sorting = Object.assign({}, this.props.sorting);

        if (sorting.order === 'desc') {
          this.props.changeSorting({
            property: this.props.sorting.property,
            order: 'asc'
          });
        } else {
          this.props.changeSorting({
            property: this.props.sorting.property,
            order: 'desc'
          });
        }
      }}>
      <i className={style.classes[this.props.sorting.order]}></i>
    </button>
  }

  render() {
    return(
      <div style={style.css.searchBar.wrapper}>
        {this.renderInput()}
        {this.renderDropdown()}
        {this.renderButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sorting: state.sorting
  }
}

const mapDispatchToProps = {
  search,
  changeSorting
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
