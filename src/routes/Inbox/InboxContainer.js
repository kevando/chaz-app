import React, { Component } from 'react';
import { LayoutAnimation, ListView, Alert } from 'react-native';
import Inbox from './Inbox';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class InboxContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillUnmount() {
    // this.props.clearNewRemoteMessages()
  }

  _acceptOpenRec = (rec) => {
    this.props.acceptRec(rec)
  }

  render() {
    // console.log(this.props)
      return (
        <Inbox
          {...this.props}
          {...this.state}
          acceptOpenRec={this._acceptOpenRec}
        />
      )
  }
}

export default InboxContainer;
