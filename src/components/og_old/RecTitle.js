import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {Actions} from "react-native-router-flux";
import {colors} from '../style/Global';

export default class RecTitle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {rec} = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.onTitlePress.bind(this)}>
          <Text style={styles.title}>{rec.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  onTitlePress(){
    var {rec, onPress} = this.props;
    onPress({rec: rec});
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: colors.darkGrey,
    marginTop:10,
    marginBottom:10
  },
})
