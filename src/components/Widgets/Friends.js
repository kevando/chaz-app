import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {colors} from '../../style/Global';

export default class Friends extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // var {rec} = this.props;


    return (
      <View>
        <Text>I am a friend</Text>
      </View>
    );
  }
  onNotePress(){
    var {rec, onPress} = this.props
    onPress({rec: rec});
  }

}
const styles = StyleSheet.create({
  note: {
    fontSize: 18,
    color:colors.darkGrey,
  },
  empty: {
    fontSize: 18,
    color:colors.grey,
  }

})
