import React, { Component } from 'react';
import { Alert } from 'react-native';
import Queue from './Queue';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'


class QueueContainer extends Component {

  // componentWillMount() {}
  // componentWillReceiveProps({recommendations}) {}
  // componentWillUpdate(nextProps, nextState){}
  // componentDidUpdate(prevProps, nextState){}
  // componentDidMount() {}

  render() {

      return (

        <Queue
          {...this.props}
          {...this.state}

        />
      )

  }
}

export default QueueContainer;
