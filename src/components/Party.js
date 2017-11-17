import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView, Alert} from 'react-native';
// import FirstRec from './FirstRec'
// import { Actions } from 'react-native-router-flux';
// import _ from 'lodash'
// import styles from './styles';
import { colors } from '../config/styles'
// import { Button } from '../../components/Generic';
// import { CategoryPicker } from '../../components/Category';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
// import * as Animatable from 'react-native-animatable';
import Confetti from 'react-native-confetti';

const CONFIG = {
  small: {confettiCount: 10, duration: 5000, timeout: 300, colors: [colors.yellow]},
  big: {confettiCount: 200, duration: 3000, timeout: 30, colors: [colors.yellow, colors.green]},

}

class FirstRecContainer extends Component {
  //
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     confettiCount: 5,
  //     duration: 5000,
  //     timeout: 300,
  //     colors: [colors.yellow],
  //   }
  // }
  componentDidMount() {
    setTimeout(() => {
      this._throwParty()
    },this.props.delay || 100)

  }
  componentWillUnmount () {
    this._confettiView && this._confettiView.stopConfetti();
  }

  _throwParty = () => {
    if(this._confettiView) {
       this._confettiView.startConfetti()
       setTimeout(()=> this._confettiView && this._confettiView.stopConfetti(),2000)
    }
  }

  render() {

    const { partySize } = this.props
    const confettiConfig = CONFIG[partySize]

    if(!confettiConfig) { return null; }

    return (
      <Confetti
        ref={(node) => this._confettiView = node}
        {...confettiConfig}
      />
      )
    }
}

export default FirstRecContainer;
