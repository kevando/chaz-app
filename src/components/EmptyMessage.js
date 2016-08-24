import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class EmptyMessage extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var {notify, instructions} = this.props;


    return (
      <View style={styles.container}>
        <Text style={styles.notify}>{notify}</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    paddingTop:110
  },
  notify: {
    fontSize:30,
    fontWeight:'600',
    textAlign:'center',
    margin:10

  },
  instructions: {
    fontSize:18,
    textAlign:'center',
    margin:10,
    fontWeight:'400',
    color:'#555'
  }

});
