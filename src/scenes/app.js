import React, { Component } from 'react';
import { connect } from 'react-redux';

import ddpClient from '../ddp';
import { changeSignInStatus } from '../reducers/app/actions';

import SignIn from './signIn';
import SignOut from './signOut';

export class App extends Component {


  componentWillMount() {
    ddpClient.connect((error, wasReconnect) => {
      if (error) {
        console.log('connect error', error);
      } else {
        ddpClient.loginWithToken((err, res) => {
          if (!err) this.props.changedSignedIn(true);
        });
      }
    });
  }

  render() {

    // probly want some sort of loading here.
    // we can be waiting for the store to get created or meteor server

    if (this.props.signedIn) {
      return <SignOut />
    } else {
      return <SignIn />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    signedIn: state.app.signedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changedSignedIn: (status) => dispatch(changeSignInStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
