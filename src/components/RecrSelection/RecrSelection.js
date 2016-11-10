import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';
import _ from 'lodash';
import Meteor, { createContainer } from 'react-native-meteor';
import styles from './styles';


class RecrSelection extends Component {

  render() {
    const { dataReady } = this.props;

    if(!dataReady)
      return <View><Text>loading</Text></View>

    return (
      <ScrollView>
          { this.renderRecrs() }
      </ScrollView>
    );
  }

  renderRecrs() {
    const recrs = _.sortBy(this.props.recrs, (recr) => { return -recr.createdAt; });

    return _.map(recrs,(recr) => { return this.renderRecr(recr) });
  }

  renderRecr(recr) {
    const { onSelect } = this.props;
    return(
      <TouchableOpacity key={recr._id} onPress={() => onSelect(recr)}>
        <View style={styles.item}>
          <View style={{flex:1}}>
            <Text style={styles.icon}><Emoji name={this.getFace(recr)} /></Text>
          </View>
          <View style={{flex:7}}>
            <Text style={[styles.recrName,this.getStyle(recr)]}>{recr.name}</Text>
            <Text style={[styles.recrScore,this.getStyle(recr)]}>Total score: {recr.score.overall.score}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  getFace(recr) {
    if(recr._id == this.props.recr._id)
      return "stuck_out_tongue"
    else
      return "slightly_smiling_face"
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
