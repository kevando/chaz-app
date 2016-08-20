import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

export default class RecTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {title: this.props.rec.title}
  }
  render() {
    // console.log('note props',this.props)

    return (
      <TextInput
        style={{fontSize: 30,height: 40,paddingLeft:10}}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
        placeholder="What do you call this recommendation?"
        ref="TitleInput"
        returnKeyType={'done'}
        onSubmitEditing={this.onSubmitEditingPress.bind(this)}
      />
    );
  }
  onSubmitEditingPress() {
    var newRec = this.props.rec;
    newRec.title = this.state.title;
    console.log('newRec',newRec);
    this.props.updateRec(newRec);
  }

}
