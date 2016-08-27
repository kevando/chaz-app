import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import ListItem from './RecrListItem';

export default class RecrList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var recrs = this.props.recrs;
    return (
      <View>
        {
          recrs.map(recr => (
             <ListItem key={recr.get('id')} recr={recr.toJS()} />
          ))}
      </View>
    );
  }


}
