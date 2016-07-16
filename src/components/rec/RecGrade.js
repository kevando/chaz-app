import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji'
export default class RecGrade extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          {this.getDisplayGrade(this.props.grade)}
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
