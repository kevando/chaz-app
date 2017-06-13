import React, { Component } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button';
import * as Animatable from 'react-native-animatable';

import InputTitle from './InputTitle';
import Routes from '../../config/routes';
import Heartman from '../../components/Heartman';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {title: ''}
  }

  renderButton() {
    if(this.state.title)
      return (
        <Animatable.View animation='fadeInUp'
          duration={500}
        >
          <Button text="Next" onPress={this.onNextPress.bind(this)} />
        </Animatable.View>
      )
  }

  renderHeartman() {
    // Offer the user some help on their first time if they sit here
    setTimeout( () => {
      if(this.props.recommendations.length == 0 && this.state.title == '') {
        Alert.alert(
          'Hey, did you know..',
          'Shawshank Redemption was written by Stephen King?',
          [
            {text: 'Thanks!', onPress: () => console.log('thanks heartman'), style: 'cancel'},
          ]
        );
      }
    },7000); // give users seven seconds to figure it out
    // if(this.props.onboard == 0 && !this.state.title && false){ // disabling onboarding fo now cause i dont know what i want to do exactly
      // return <Heartman delay={4000} text='Hi, type your first rec' />
    // }
  }

  onNextPress() {
    const { navigator, setTitle } = this.props;
    setTitle(this.state.title); // Redux
    navigator.push(Routes.getInputFriendRoute());
  }

  render() {
    return (
      <InputTitle
        updateState={this.setState.bind(this)}
        renderButton={this.renderButton.bind(this)}
        renderHeartman={this.renderHeartman.bind(this)}
      />
    );
  }

}

export default InputTitleContainer;
