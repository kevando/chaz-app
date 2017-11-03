import React, { Component } from 'react';
import Invite from './Invite';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash'

// const usersRef = firebase.firestore().collection("users")

class InviteContainer extends Component {
  constructor(props) {
    super(props)
    console.log('InviteContainer',props)
    this.state = {
      phoneNumber: '',
      validPhoneNumber: false,
      invitation: null,
      updateState: state => this.setState(state),
      userFound: null,
    }
  }
  componentDidMount() {
    console.log('mounted?')
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
    // update the UI
    this.setState({invitation: 'sending'})
  }


  render() {
    console.log('InviteContainer',this.props)

    return (
      <Invite
        {...this.state}

        friend={this.props.friend}
        user={this.props.user}
        sendInvite={this._sendInvite}
        app={this.props.app}
        searchUsers={() => this.props.searchUsers(this.props.friend,this.state.phoneNumber)}
        sendInvite={() => this.props.sendInvite(this.props.friend,this.state.phoneNumber)}
        assignFriend={() => this.props.assignUserToFriend(this.props.friend)}
      />
    );
  }

}

export default InviteContainer;
