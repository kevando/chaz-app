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
          <Text style={{color:'#999'}}>
            <TimeAgo time={this.props.timestamp} />
            </Text>
        </View>
    );
  }

  getDisplayGrade(grade) { // this should probly be its own component
    if(grade == 0 || grade == null)
      return;

    var stars = [];
    for (var i=0; i < grade; i++) {
      stars.push(<Emoji key={i} name="blue_heart" />);
    }
    return <Text style={styles.recListItemRecGrade}>{stars}</Text>;
  }
}

const styles = StyleSheet.create({
  recListItemRecGrade: {
    fontSize:11,
    paddingTop:3
  },

});
