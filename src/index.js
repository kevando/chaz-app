import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';

import LoggedOut from './layouts/LoggedOut';
import LoggedIn from './layouts/LoggedIn';
import Loading from './components/Loading';
import settings from './config/settings';

Meteor.connect(settings.METEOR_URL);

const RNApp = function(props) {
  const { status, user, loggingIn } = props;

  if (status.connected === false) {
    return <Loading text='Connecting' heart='purple' />;
  } else if (loggingIn){
    return <Loading text='Authenticating' heart='green' />;
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
