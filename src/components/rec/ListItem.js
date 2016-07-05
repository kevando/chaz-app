import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={ this.onRecPress.bind(this) }>
        <Text>{this.props.rec.title}</Text>
      </TouchableOpacity>
    );
  }

  // chaz
  onRecPress() {
    this.props.navigator.push({
      title: "Rec",
      screen: "chaz.RecViewScreen",
      passProps: { currentRec: this.props.rec }
    });
  }
}
