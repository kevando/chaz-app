import React, { Component } from 'react';
import { LayoutAnimation, ListView, Alert } from 'react-native';
import Invites from './Invites';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class InvitesContainer extends Component {
  constructor(props) {
    super(props)
    
  }



  render() {
    // console.log(this.props)
      return (
        <Invites
          {...this.props}
        />
      )
  }
}

export default InvitesContainer;
