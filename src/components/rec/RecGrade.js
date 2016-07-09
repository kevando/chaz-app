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
    return <Text style={styles.recListItemRecGradeMissing}>{stars}</Text>;
  }
}

const styles = StyleSheet.create({
  gradee: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    height:50,
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10
  },

});
