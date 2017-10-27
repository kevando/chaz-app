import React, { Component } from 'react';
import { LayoutAnimation, ListView } from 'react-native';
import Register from './Register';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '12345678',
      status: '',
      error: '',
    };
    this._onLogoutPress = this._onLogoutPress.bind(this)
    this._onRegisterPress = this._onRegisterPress.bind(this)
    this._onLoginPress = this._onLoginPress.bind(this)
    // this._onGivePress = this._onGivePress.bind(this)
    this.updateState = this.updateState.bind(this)
    this._createUserCallback = this._createUserCallback.bind(this)
  }

  componentDidMount() {
    // TMP!!
    // Actions.push('FriendView',{friend: this.props.friends[0]})
  }

  _createUserCallback() {
    console.log('user call back')
    Actions.replace('Profile')
  }
  updateState(state) {
    this.setState(state)
  }

  _onRegisterPress() {

    // this._createUserCallback()
    //
    // this.setState({status: 'Creating User'})
    //
    const { createUser } = this.props
    const { username, password } = this.state
    const email = username+"@kevaid.com"
    createUser(email,password,username,this._createUserCallback)
  }

  _onLoginPress() {
    const { loginUser } = this.props
    const { username, email, password } = this.state
    loginUser(email,password)
  }
  _onLogoutPress() {
    const { logoutUser } = this.props
    logoutUser()
  }

  render() {
    // console.log(this.props)
      return (
        <Register
          {...this.state}
          onRegisterPress={this._onRegisterPress}
          updateState={this.updateState}
          onLoginPress={this._onLoginPress}
        />
      )
  }
}

export default RegisterContainer;
