import React, {Component} from 'react';
import {
  Text
} from 'react-native';

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text>{this.props.message}</Text>
    );
  }
}
