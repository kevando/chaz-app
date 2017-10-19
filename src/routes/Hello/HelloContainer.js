import React, { Component } from 'react';
import Hello from './Hello';
import { Actions } from 'react-native-router-flux';

class HelloContainer extends Component {

  _onPress() {
    // Actions.replace('Dashboard')
    Actions.push('InputStack',{onboarding: true})
  }
  render() {

    return (
      <Hello
        onPress={this._onPress}
      />
    );
  }

}

export default HelloContainer;
