import React, { Component } from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { search  } from '../../actions/index';

class Input extends Component {
  render() {
    return(
      <SemanticInput
        onChange={(e) => {this.props.search(e.target.value);}}
        placeholder='Search...' />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
