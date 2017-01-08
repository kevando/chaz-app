import React, { Component } from 'react';
import Button from '../../components/Button';

import InputTitle from './InputTitle';
import Routes from '../../config/routes';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {title: 'f'}
  }

  renderButton() {
    if(this.state.title)
      return <Button text="Next" onPress={this.onNextPress.bind(this)} />
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
      />
    );
  }

}

export default InputTitleContainer;
