import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ListView
} from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

class RecrSelection extends Component {

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={ds.cloneWithRows(this.props.recrs)}
        enableEmptySections={true}
        renderRow={(recr) => this.renderRecr(recr)}
      />
    );
  }

  renderRecr(recr) {
    const { onSelect } = this.props;
    return(
      <TouchableOpacity onPress={() => onSelect(recr)}>
        <Text style={this.getStyle(recr)}>{recr.name}</Text>
      </TouchableOpacity>
    );
  }

  getStyle(recr) {

    if(recr._id == this.props.recr._id)
      return {fontWeight:'700'}
    else
      return {fontWeight:'400'}
  }

}

export default createContainer((props) => {
  const handle = Meteor.subscribe('recrs-list',Meteor.userId());

  return {
    recrs: Meteor.collection('recrs').find()//.find({status: "pending"}),
  };
}, RecrSelection);
