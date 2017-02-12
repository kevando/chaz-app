import React, { Component } from 'react';
var DeviceInfo = require('react-native-device-info');
var Mailer = require('NativeModules').RNMail;

import Debug from './Debug';

class DebugContainer extends Component {

  purgeData() {
    this.props.dispatch({type:'PURGE_DATA'});
  }

  handleHelp() {
    Mailer.mail({
      subject: 'Feedback',
      recipients: ['feedback@chaz.co'],
      body: '',
      isHTML: true, // iOS only, exclude if false
    }, (error, event) => {
        if(error) {
          alert('Could not send mail. Please send a mail to feedback@chaz.co');
        }
    });
  }

  render() {

    return (
      <Debug
        {...this.props}
        onPurgePress={this.purgeData.bind(this)}
        appVersion={DeviceInfo.getReadableVersion()}
        deviceName={DeviceInfo.getDeviceName()}
        onFeedbackPress={this.handleHelp.bind(this)}
      />
    );
  }
}

export default DebugContainer;
