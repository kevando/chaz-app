import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

export default class RecNote extends Component {

  constructor(props) {
    super(props);
    this.state = {note: this.props.rec.note}
  }
  render() {
    // console.log('note props',this.props)

    return (
      <TextInput
        style={{fontSize:15,height: 40,paddingLeft:10}}
        onChangeText={(note) => this.setState({note})}
        value={this.state.note}
        placeholder="Write a note about this moment..."
        ref="NoteInput"
        returnKeyType={'done'}
        onSubmitEditing={this.onSubmitEditingPress.bind(this)}
      />
    );
  }
  onSubmitEditingPress() {
    var newRec = this.props.rec;
    newRec.note = this.state.note;
    console.log('newRec',newRec);
    this.props.updateRec(newRec);
  }

}
