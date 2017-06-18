import React, { Component } from 'react';
import _ from 'lodash';

import Button from '../../components/Button';
import InputFriend from './InputFriend';
import Routes from '../../config/routes';

class InputFriendContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friend: '',
      friends: this.props.friends.reverse()
    }
  }

  renderButton() {
    if(this.state.friend)
      return <Button text="Next" onPress={this.onNextPress.bind(this)} />
  }

  onNextPress() {
    const { setFriend, saveFriend } = this.props;
    const {friend} = this.state;
    setFriend(friend); // Redux
    saveFriend({name: friend}); // Redux

    const { navigate } = this.props.navigation;
    navigate('ConfirmRecommendation');

  }

  onKeyPress(friend) {
    const { friends } = this.props;
    const filteredFriends = _.filter(friends, ({name}) => { return name.includes(friend); });
    this.setState({friends: filteredFriends, friend })
  }

  onFriendPress(name) {
    const { navigator, setFriend } = this.props;
    setFriend(name); // Redux
    // navigator.push(Routes.getConfirmRecommendationRoute());
    const { navigate } = this.props.navigation;
    navigate('ConfirmRecommendation');
  }

  render() {
    return (
      <InputFriend
        onFriendPress={this.onFriendPress.bind(this)}
        renderButton={this.renderButton.bind(this)}
        onKeyPress={this.onKeyPress.bind(this)}
        friends={this.state.friends}
      />
    );
  }

}

export default InputFriendContainer;
