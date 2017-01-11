import React, { Component } from 'react';

import Hello from './Hello';
import Routes from '../../config/routes';

class HelloContainer extends Component {

  render() {

    const { navigator } = this.props;

    return (
      <Hello
        onStartPress={() => navigator.push(Routes.getStartRoute())}
      />
    );
  }

}

export default HelloContainer;
