import React, { Component } from 'react';
import Invite from './Invite';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';
import _ from 'lodash'



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
    console.log('Invite Container mounted')
  }


  _sendInvite = () => {
    // alert('sdfasdfs')
    // return
    const { sendInvite, friend } = this.props
    const { phoneNumber } = this.state
    // console.warn(phoneNumber)
    const phoneNum = phoneNumber || friend.phoneNumber
    if(!phoneNum){
      alert('no phon')
      return
    }
    sendInvite(friend, phoneNum)
    // update the UI
    this.setState({invitation: 'sending'})
  }


  render() {
    // console.log('InviteContainer',this.props)

    return (
      <Invite
        {...this.state}

        friend={this.props.friend}
        user={this.props.user}
        sendInvitePress={this._sendInvite}
        app={this.props.app}
        searchUsers={() => this.props.searchUsers(this.props.friend,this.state.phoneNumber)}
        sendInvite={() => this.props.sendInvite(this.props.friend,this.state.phoneNumber)}
        assignFriend={() => this.props.assignUserToFriend(this.props.friend)}
        updateFriend={this.props.updateFriend}
      />
    );
  }

}

export default InviteContainer;
