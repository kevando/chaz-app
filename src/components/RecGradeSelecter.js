import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';

import RecGrade from './RecGrade';

var BUTTONS = [
  'O Stars',
  '1 Star',
  '2 Stars',
  '3 Stars',
  '4 Stars',
  '5 Stars',
  'Cancel',
];
var CANCEL_INDEX = BUTTONS.length-1;

export default class RecGradeSelecter extends Component {
  constructor(props) {
    super(props);
    this.state = {grade: this.props.rec.grade}
  }


  render() {

    var grade = this.state.grade;
    return (
      <View >
        <TouchableOpacity onPress={this.onChangeGradePress.bind(this)}>
        {(grade != null
          ? <RecGrade size={30} grade={grade} />
          : <Text>Grade this on  0-5 stars</Text>
        )}
        </TouchableOpacity>
      </View>
    );
  }
  onGradeSelect() {
    var newRec = this.props.rec;
    newRec.grade = this.state.grade; // might be a bad flow for perf
    this.props.gradeRec(newRec);
    this.props.updateRecrStats(newRec);

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
      // console.log('selectedIndex',selectedIndex)
      if(selectedIndex != CANCEL_INDEX){
         this.setState({ grade: selectedIndex }); // index correlates to grade value
        this.onGradeSelect()
      }
    });
  }

}
