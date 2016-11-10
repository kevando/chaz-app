import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';
import Profile from './Profile';

class ProfileContainer extends Component {
  handleSignOut() {
    AsyncStorage.setItem('authStatus', 'loggedOut');
    Meteor.logout();
  }

  render() {
    const { user } = this.props;

    return (
      <Profile
        user={user}
        signOut={this.handleSignOut.bind(this)}
      />
    );
  }
}

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, ProfileContainer);
