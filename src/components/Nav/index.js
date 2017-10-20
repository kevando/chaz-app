import React, {Component} from 'react';
import {Button, Keyboard } from 'react-native';
import { Actions} from 'react-native-router-flux';
// import Button from './Button';
import DashboardNav from './DashboardNav';
import SettingsButton from './SettingsButton';

export {
  DashboardNav,
  // Button,
  SettingsButton,
};



// --------------------------------
// Close Button for InputTitle

export class CloseButton extends Component {

  _onClose() {
    Keyboard.dismiss()
    Actions.pop()
  }
  render() {
    return (
      <Button onPress={this._onClose} title="Close" color="white" />
    )
  }
}
