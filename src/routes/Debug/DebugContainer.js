import React, { Component } from 'react';

import Debug from './Debug';

class DebugContainer extends Component {

  purgeData() {
    this.props.dispatch({type:'PURGE_DATA'});
  }

  render() {

    return (
      <Debug
        {...this.props}
        onPurgePress={this.purgeData.bind(this)}
      />
    );
  }
}

export default DebugContainer;
