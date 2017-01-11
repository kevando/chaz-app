import React, { Component } from 'react';
import Button from '../../components/Button';

import InputFriend from './InputFriend';
import Routes from '../../config/routes';

class InputFriendContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {friend: ''}
  }

  renderButton() {
    if(this.state.friend)
      return <Button text="Next" onPress={this.onNextPress.bind(this)} />
  }

  onNextPress() {
    const { navigator, setFriend } = this.props;
    setFriend(this.state.friend); // Redux
    // @todo also create friend object
    navigator.push(Routes.getConfirmRecommendationRoute());
  }

  render() {
    return (
      <InputFriend
        updateState={this.setState.bind(this)}
        renderButton={this.renderButton.bind(this)}
      />
    );
  }

}

export default InputFriendContainer;
