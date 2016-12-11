import React, { Component } from 'react';
import { View, Text, ScrollView, NetInfo } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';

import { saveRecommendation, requestPerson, requestPersonByUrl, connectionState } from './actions';

class NameList extends Component {
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
    return (
      <View style={{ flex: 1 }}>
      <List>
            <ListItem key={'asdf'} title={this.props.isConnected ? 'Connected' : 'Not Conntected'} />
            <ListItem key={'asdff'} title={'some meteor info'} />
      </List>
        <ScrollView>
          <List>
            {
              this.props.recommendations.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                />
              ))
            }
          </List>
        </ScrollView>
        <Icon
          raised
          name={this.props.isConnected ? 'add' : 'alarm-add'}
          color='#51b9d3'
          reverse
          onPress={() => this.props.dispatch(saveRecommendation({ title: 'some Title' }))}
          containerStyle={{ position: 'absolute', right: 20, bottom: 20 }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    personIndex: state.personIndex,
    actionQueue: state.actionQueue,
    isConnected: state.isConnected,
    recommendations: state.recommendations,
  };
};

export default connect(mapStateToProps)(NameList);
