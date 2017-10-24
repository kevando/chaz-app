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
      password: '',
      status: '',
      error: '',
    };
    this._onLogoutPress = this._onLogoutPress.bind(this)
    this._onRegisterPress = this._onRegisterPress.bind(this)
    this._onLoginPress = this._onLoginPress.bind(this)
    this._onGivePress = this._onGivePress.bind(this)
    this.updateState = this.updateState.bind(this)
  }
  componentWillMount() {
    // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // this.state = {activeFilter: 'Everything'};
  }
  componentDidMount() {
    // TMP!!
    // Actions.push('FriendView',{friend: this.props.friends[0]})
  }

  componentWillReceiveProps({user}) {
    if(!user.isAnonymous){
      this.setState({status: 'User Created!'})
      setTimeout(() => {
        Actions.replace('Profile')
      }, 1000);
    }
  }
  updateState(state) {
    this.setState(state)
  }

  _onRegisterPress() {
    this.setState({status: 'Creating User'})

    const { createUser } = this.props
    const { username, email, password } = this.state
    createUser(email,password,username,this.updateState)
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
  _onGivePress() {
    const { giveRec } = this.props
    giveRec()
  }

  render() {
    console.log(this.props)


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
