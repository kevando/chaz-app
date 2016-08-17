import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

import {connect} from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: 'red',
  }
});

// TMP
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

class Profile extends Component {


  componentDidMount() {
    // put this somewhere more universal
    console.log('IM SO COOL IM A POPUP');
    // Actions.popup(this.props.app.get('welcomeMessage'));

  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>

        <Button onPress={this.clearStorage} style={{fontSize:30}}>engine.save()</Button>
      </View>
    );
  }
  clearStorage(){
    engine.save({});
  }
}


function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(Profile);

//
// module.exports = Launch;
