import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';
import Meteor, { createContainer } from 'react-native-meteor';
import styles from './styles';

class RecrSelection extends Component {

  render() {
    const { dataReady } = this.props;

    if(!dataReady)
      return <View><Text>loading</Text></View>

    return (
      <View style={{flex: 1}}>
      { this.renderRecrs() }
    </View>
    );
  }

  renderRecrs() {
    const { recrs } = this.props;
    const displayRecrs = [];
    for(recr of recrs) {
      displayRecrs.push(this.renderRecr(recr));
    }
    return displayRecrs;
  }


  renderRecr(recr) {
    const { onSelect } = this.props;
    return(
      <TouchableOpacity key={recr._id} onPress={() => onSelect(recr)}>
        <View style={styles.item}>
          <Text style={this.getStyle(recr)}><Emoji name="stuck_out_tongue" />&nbsp;{recr.name}</Text>
        </View>
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
    dataReady: handle.ready(),
    recrs: Meteor.collection('recrs').find()//.find({status: "pending"}),
  };
}, RecrSelection);
