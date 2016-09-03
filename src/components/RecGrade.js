import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';



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

export default class RecType extends Component {
  constructor(props) {
    super(props);
    // console.log('recType type in constructor',this.props.rec.type)
    this.state = {grade: this.props.rec.grade || null}
    // this.getOptions = this.getOptions.bind(this)
  }

  componentWillReceiveProps(newProps) {
    // user edited type so the list item needs to be refreshed
    this.setState({grade: newProps.rec.grade  || null }); // should never return null
  }


  render() {

    var grade = this.state.grade;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onChangeGradePress.bind(this)}>
        {(grade
          ? <Text>You gave this a grade of {grade} out of 5</Text>
          : <Text>Grade this on  0-5 stars</Text>
        )}
        </TouchableOpacity>
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

const styles = StyleSheet.create({


});
