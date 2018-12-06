import React, { Component } from 'react';
import * as style from '../../constants/style';
import { connect } from 'react-redux';
import { changeSorting  } from '../../actions/index';

class SearchBar extends Component {
  render() {
    return(
      <button className="ui icon button"
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
