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
    this.state = {grade: this.props.rec.grade || null}
  }

  render() {

    var grade = this.state.grade;
    return (
      <View style={styles.container}>
        {(grade == 0
          ? <Text>No Love</Text>
          : <Text>Grade this on  0-5 stars</Text>
        )}
      </View>
    );
  }
  onGradeSelect() {
    var newRec = this.props.rec;
    newRec.grade = this.state.grade; // might be a bad flow for perf
    this.props.updateRec(newRec);
    this.props.updateRecrScore(newRec);

    // New CHAT FEATURE
    // this.props.appendMessageToRec("Added a new grade",newRec.id);
    // disabling for now
  }
  onChangeGradePress() {

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Grade this recommendation',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (selectedIndex) => {
      console.log('selectedIndex',selectedIndex)
      if(selectedIndex != CANCEL_INDEX){
         this.setState({ grade: selectedIndex }); // index correlates to grade value
        this.onGradeSelect()
      }
    });
  }

}
