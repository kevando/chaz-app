import React, { Component } from 'react';
import { LayoutAnimation, ListView, Alert } from 'react-native';
import Reminders from './Reminders';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

// import firebase from 'react-native-firebase'

class RemindersContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // componentDidMount() {
  //   this.props.getScheduledReminders()
  //     .then(reminders => this.state.reminders = 'reminders')
  // }
  componentWillUnmount() {
    // console.warn('Reminders component will unmount')
    // console.log('UN',this.props)
    this.props.clearNewRemoteMessages()
  }


  render() {
    console.log('reminders',this.props)
      return (
        <Reminders
          {...this.props}
          {...this.state}



        />
      )
  }
}

export default RemindersContainer;
