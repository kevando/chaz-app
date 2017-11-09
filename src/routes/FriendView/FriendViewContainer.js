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
  componentDidMount() {
    console.log('FriendView Container mounted')
  }

  _onGiveRecPress = () => {
    const { initNewRec, friend, user } = this.props
    initNewRec({to: {uid: friend.uid, name: friend.name, id: friend.id},from:{uid: user.uid, displayName: user.displayName}}).then(
      Actions.push('NewRecLightbox')
    )
  }

  _combineFriend = (friend) => {
    // console.warn('FRIEND',friend)
    if(!friend) {
      // then create a brand new friend
      // which simple means adding a name, and removing pending status
      const friendData = {phoneNumber: this.props.friend.phoneNumber,name: this.props.friend.displayName, friendshipStatus: 'accepted'}
      this.props.updateFriend(this.props.friend,friendData)
      Actions.pop()

    } else {
      // console.warn('updateFriend',this.props.friend)
      // user already existed as a friend,
      // so pretty much delete this friend object,
      // and assign uid to existing friend

      const friendData = {uid: this.props.friend.uid, phoneNumber: this.props.friend.phoneNumber}
      this.props.updateFriend(friend,friendData)
        .then(console.log('updated?'))
      this.props.deleteFriend(this.props.friend)
      Actions.pop()
    }
  }

  render() {
    // console.log('FriendViewContainer',this.props)

    if(!this.props.friend)  { return null } // SOME ERROR

    return (
      <FriendView
        givenRecs={this.props.givenRecs}
        combineFriend={this._combineFriend}
        friend={this.props.friend}
        friends={this.props.friends}
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
