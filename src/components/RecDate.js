import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji';
var TimeAgo = require('react-native-timeago');
export default class RecDate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <Text style={{color:'#333',fontSize:13,fontWeight:'400',textAlign:'right'}}>
            <TimeAgo time={this.props.timestamp} />
            </Text>
        </View>
    );
  }

}
