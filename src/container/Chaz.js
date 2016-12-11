import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';

import { requestPerson, requestPersonByUrl, connectionState } from '../actions';

import LoggedOut from '../layouts/LoggedOut';
import LoggedIn from '../layouts/LoggedIn';
//tmp
import NameList from '../NameList';

class Chaz extends Component {
  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectionChange);
  }

  _handleConnectionChange = (isConnected) => {
    const { dispatch, actionQueue } = this.props;
    dispatch(connectionState({ status: isConnected }));

    if (isConnected && actionQueue.length > 0) {
      actionQueue.forEach((url) => {
        this.props.dispatch(requestPersonByUrl({ url }));
      });
    }
  };

  render() {

    const { uid } = this.props;

    if (uid === null) {
      return <LoggedOut />;
    } else {
      return <NameList />;
    }
  };
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    personIndex: state.personIndex,
    actionQueue: state.actionQueue,
    isConnected: state.isConnected,
    uid: state.uid,
  };
};

export default connect(mapStateToProps)(Chaz);
