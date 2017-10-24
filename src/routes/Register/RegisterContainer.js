import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';
import Register from './Register';
// import Welcome from './Welcome'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this._onLogoutPress = this._onLogoutPress.bind(this)
    this._onRegisterPress = this._onRegisterPress.bind(this)
    this._onLoginPress = this._onLoginPress.bind(this)
    this._onGivePress = this._onGivePress.bind(this)
  }
  componentWillMount() {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {activeFilter: 'Everything'};
  }
  componentDidMount() {
    // TMP!!
    // Actions.push('FriendView',{friend: this.props.friends[0]})
  }

  componentWillUpdate() {
    // LayoutAnimation.easeInEaseOut(); // todo figure this out later
  }

  _onRegisterPress(email, username) {
    const { createUser } = this.props
    createUser(email,'12345678',username)
  }
  _onLoginPress(email) {
    const { loginUser } = this.props
    loginUser(email,'12345678')
  }
  _onLogoutPress() {
    const { logoutUser } = this.props
    logoutUser()
  }
  _onGivePress() {
    const { giveRec } = this.props
    giveRec()
  }

  render() {
    console.log(this.props)


      return (
        <Register
          {...this.props}
          {...this.state}
          onRegisterPress={this._onRegisterPress}
          onLoginPress={this._onLoginPress}
          onLogoutPress={this._onLogoutPress}
          onGivePress={this._onGivePress}
        />
      )



  }
}

export default RegisterContainer;
