import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';


export default class RecGrade extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var grade = this.props.grade;
    return (
      <View>
        {(grade === 0
          ? <Text>No Love</Text>
          :
          <Text style={{fontSize:this.props.size}}>
          {this.renderStars(grade)}
          </Text>
        )}
      </View>
    );
  }
  renderStars(grade){

    var rows = [];
    for (var i=0; i < grade; i++) {
      rows.push(<Emoji key={i} name="yellow_heart" />);
    }
    return rows;
  }

}
