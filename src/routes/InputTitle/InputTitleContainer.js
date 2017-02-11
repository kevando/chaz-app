import React, { Component } from 'react';
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
    if(this.props.onboard == 0 && !this.state.title && false){ // disabling onboarding fo now cause i dont know what i want to do exactly
      return <Heartman delay={4000} text='Hi, type your first rec' />
    }
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
