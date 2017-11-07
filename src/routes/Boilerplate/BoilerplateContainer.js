import React, { Component } from 'react';
import Boilerplate from './Boilerplate';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

// import firebase from 'react-native-firebase'

class BoilerplateContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  // componentWillUnmount(){}
  // componentDidCatch(){}


  render() {

      return (
        <Boilerplate
          {...this.props}
          {...this.state}
        />
      )
  }
}

export default BoilerplateContainer;
