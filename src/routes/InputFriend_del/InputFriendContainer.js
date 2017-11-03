import React, { Component } from 'react';
import _ from 'lodash';

import { Button } from '../../components/Generic';
import InputFriend from './InputFriend';
import { Actions } from 'react-native-router-flux';

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
    const { addFriend } = this.props;
    const {friend} = this.state;
    addFriend({name: friend}); // Redux (also sets friendId)
    Actions.push('ConfirmRecommendation');
  }

  onKeyPress(friend) {
    const { friends } = this.props;
    const filteredFriends = _.filter(friends, ({name}) => { return name.includes(friend); });
    this.setState({friends: filteredFriends, friend })
  }

  onFriendPress(friend) {
    const { setFriendId } = this.props;
    setFriendId(friend.id); // Redux
    Actions.push('ConfirmRecommendation');
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
