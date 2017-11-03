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
    // this._deleteRecommendation = this._deleteRecommendation.bind(this)
    this._onGiveRecPress = this._onGiveRecPress.bind(this)
    // this._assignUser = this._assignUser.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  _onKeyPress(phoneNumber){
    this.setState({
      phoneNumber,
      validPhoneNumber: phoneNumber.length === 10
    })
  }

  // _assignUser() {
  //   const { assignUserToFriend, friend, assignUserToRecs } = this.props
  //   const { userFound } = this.state
  //   if(!userFound){
  //     alert('No user found, sorry')
  //   } else {
  //     alert('User connected!')
  //     Actions.refresh({friend: {...friend,uid:userFound.uid}}) // tmp bad code
  //     // this.setState({input:''})
  //     assignUserToFriend(userFound,friend)
  //     assignUserToRecs(userFound,friend)
  //   }
  //
  // }

  _sendInvite = () => {
    const { sendInvite, friend } = this.props
    const { phoneNumber } = this.state
    sendInvite(friend, phoneNumber)
  }

  _onGiveRecPress() {
    const { initNewRec,friend, user } = this.props
    initNewRec({from: user.uid, to: friend.uid, friend: {name: 'me'}})
    Actions.push('InputStack')
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
