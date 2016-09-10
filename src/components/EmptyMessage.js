import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import {colors} from '../style/Global';

export default class EmptyMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    var {title, notify, instructions} = this.props;

    return (
      <View style={styles.container}>
        {(title ? <Text style={styles.title}>{title}</Text> : null )}
        {(notify ? <Text style={styles.notify}>{notify}</Text> : null )}
        {(instructions ? <Text style={styles.instructions}>{instructions}</Text> : null )} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    // flexDirection:'column',
    backgroundColor:colors.lightGrey,
    // paddingTop:30
  },
  title: {
    fontSize:30,
    fontWeight:'600',
    color:colors.darkGrey,
    margin:10
  },
  notify: {
    fontSize:20,
    color:colors.darkGrey,
    fontWeight:'500',
    margin:10
  },
  instructions: {
    fontSize:18,
    margin:10,
    fontWeight:'300',
    color:colors.darkGrey,
  }

});
