import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji'
export default class RecType extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          {this.getDisplayType()}
        </View>
    );
  }

  getDisplayType() { // this should probly be its own component

      return(<Emoji name="page_with_curl" />);


  }
}

const styles = StyleSheet.create({
  gradee: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    height:50,
    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10
  },

});
