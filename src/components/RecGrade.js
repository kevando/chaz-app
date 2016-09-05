import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';


export default class RecType extends Component {
  constructor(props) {
    super(props);
    this.state = {grade: this.props.grade}
  }

  render() {


    var grade = this.state.grade;
    console.log('grade',grade)
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
