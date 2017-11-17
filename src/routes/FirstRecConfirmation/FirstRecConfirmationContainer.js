  import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Alert} from 'react-native';
import FirstRecConfirmation from './FirstRecConfirmation'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


class FirstRecConfirmationContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // titleInput: '',
      // friendInput: '',
      // updateState: (state) => this.setState(state),
    }
  }


  // this works to navigate from onboarding to dashboard

  _onSaveRecPress = () => {
    const { saveRec, setAppData } = this.props;

    // Actions.push('lightbox')
    // setAppData({onboarding: false})
    // return



    saveRec().then(() => {
      Actions.push('lightbox')
      // setAppData({onboarding: false})
    })

  }


  render() {

    return (
      <FirstRecConfirmation
        {...this.state}
        {...this.props}
        onSaveRecPress={this._onSaveRecPress}

        />
      )
    }
}

export default FirstRecConfirmationContainer;
