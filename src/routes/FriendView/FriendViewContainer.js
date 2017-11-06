import React, { Component } from 'react';
import FriendView from './FriendView';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash'

// const usersRef = firebase.firestore().collection("users")

class FriendViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      validPhoneNumber: false
    }


  }

  _onGiveRecPress = () => {
    const { initNewRec, friend, user } = this.props
    initNewRec({from: user.uid, to: friend.uid, to_name: friend.name, friendId: friend.id, friend: {name: user.displayName}})
    Actions.push('NewRecLightbox')
  }

  render() {
    // console.log('FriendViewContainer',this.props)

    if(!this.props.friend)  { return null } // SOME ERROR

    return (
      <FriendView
        givenRecs={this.props.givenRecs}
        friend={this.props.friend}
        myRecs={this.props.myRecs}
        onKeyPress={this._onKeyPress}
        user={this.props.user}
        sendInvite={this._sendInvite}
        onGiveRecPress={this._onGiveRecPress}
        {...this.state}
        app={this.props.app}
      />
    );
  }

}

export default FriendViewContainer;
