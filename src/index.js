import React from 'react';
import { AsyncStorage } from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor';

import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';
import settings from './config/settings';

Meteor.connect(settings.METEOR_URL);

const RNApp = function(props) {
  const { status, user, loggingIn } = props;

  if (status.connected === false || loggingIn) {
    return <Loading text='Connecting & Authenticating' heart='yellow' paddingTop={64} />;
  } else if (user !== null) {
    return <LoggedIn />;
  } else {
    return <LoggedOut />;
  }
};

RNApp.propTypes = {
  status: React.PropTypes.object,
  user: React.PropTypes.object,
  loggingIn: React.PropTypes.bool,
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, RNApp);
