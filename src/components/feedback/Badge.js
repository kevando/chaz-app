import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';

export default class Badge extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var feedback = this.props.feedback;
    return (
      <View style={styles.container} >
        <Text style={styles.version}>Version {feedback.version}</Text>
        <Text style={styles.date}>{feedback.timestamp}</Text>
        <Text style={styles.message}>{feedback.version}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor:'#ccc',
    borderWidth:1,
    backgroundColor: '#fff',
    padding:10,
    marginBottom: 10,
    marginTop:10,
  },
  version: {
    fontSize:14,
    fontWeight: '700'
  },
  date: {
    color:'#444',
    fontSize: 12
  },
  message: {
    margin:5
  }

});
