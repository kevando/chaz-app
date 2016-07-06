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
    // console.log('RECR',this.props.recr.recs.length)
    return (
      <TouchableOpacity onPress={ this.onRecPress.bind(this) }>
        <Text>{this.props.recr.name}({this.getRecCount(this.props.recr.recs)})</Text>
      </TouchableOpacity>
    );
  }
  getRecCount(recs) {
    if(!recs)
      return 0;
      var count = 0;
    for (var key in recs) {
      count++;
    }
    return count;
  }

  // chaz
  onRecPress() {
    this.props.navigator.push({
      title: "Recr",
      screen: "chaz.RecrViewScreen",
      passProps: { recr: this.props.recr }
    });
  }
}
