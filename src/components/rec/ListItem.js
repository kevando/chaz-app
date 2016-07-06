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
        <Text>
          <Text style={{fontSize:15,fontWeight:'500'}}>
            [ {this.props.rec.title} ({this.props.rec.grade}) ]
            </Text>
            [ {this.getRecrName()} ({this.getRecrScore()})]
        </Text>
      </TouchableOpacity>
    );
  }
  getRecrName() {
    if(this.props.rec.recr)
      return this.props.rec.recr.name
  }
  getRecrScore() {
    if(this.props.rec.recr)
      return this.props.rec.recr.score
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
