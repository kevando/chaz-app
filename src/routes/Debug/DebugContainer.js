import React, { Component } from 'react';
// var Mailer = require('NativeModules').RNMail;
import { Actions } from 'react-native-router-flux';
import Debug from './Debug';

class DebugContainer extends Component {

  // purgeData() {
  //   this.props.dispatch({type:'PURGE_DATA'});
  // }

  // handleHelp() {
  //   Mailer.mail({
  //     subject: 'Feedback',
  //     recipients: ['feedback@chaz.co'],
  //     body: '',
  //     isHTML: true, // iOS only, exclude if false
  //   }, (error, event) => {
  //       if(error) {
  //         alert('Could not send mail. Please send a mail to feedback@chaz.co');
  //       }
  //   });
  // }
  _changeNamePopup = () => {

    AlertIOS.prompt(
      'Hey there cowboy', 'You sure a name change makes sense?',
      [
        {text: 'Update Name', onPress: (text) => this.props.saveDisplayName(text) },
        // {text: 'Log Out', onPress: () => this.props.signOut(), },
        // {text: 'Refresh Token', onPress: () => this.props.refreshServerToken(), },
        // {text: 'Turn Dev Mode On', onPress: () => this.props.setAppData({devMode: true}), },
        // {text: 'Turn Dev Mode Off', onPress: () => this.props.setAppData({devMode: false}), },
        {text: 'Cancel', style: 'cancel'},
      ]
    )
  }

  _close = () => {
    Actions.pop()

  }

  render() {

    return (
      <Debug
        {...this.props}
        onClose={this._close}
        changeNamePopup={this._changeNamePopup}
      />
    );
  }
}

export default DebugContainer;
