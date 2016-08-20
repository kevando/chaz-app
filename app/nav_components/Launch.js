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

// VERY TMP
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

class Launch extends Component {


  componentDidMount() {
    // put this somewhere more universal
    console.log('IM SO COOL IM A POPUP');
    // Actions.popup(this.props.app.get('welcomeMessage'));

  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        <Text>User ID: <Text style={{fontWeight:'600'}}>{this.props.app.getIn(['user','uid'])}</Text></Text>
        <Text>------------------------</Text>
        <Text>Launch page</Text>
        <Button onPress={()=>Actions.login({data:"Custom data", title:"Custom title" })}>Go to Login page</Button>
        <Button onPress={Actions.register}>Go to Register page</Button>
        <Button onPress={Actions.recList}>Go to Rec List Screen</Button>
        <Button onPress={Actions.recAdd}>Add Rec</Button>
        <Button onPress={Actions.register2}>Go to Register page without animationnnn</Button>
        <Button onPress={()=>Actions.error("Error message")}>Popup error</Button>
        <Button onPress={()=>Actions.popup("POP UP")}>Popup</Button>
        <Button onPress={Actions.tabbar}>Go to TabBar page</Button>
        <Button onPress={Actions.switcher}>Go to switcher page</Button>
        <Button onPress={this.clearStorage} style={{fontSize:30}}>engine.save()</Button>
        <Button onPress={Actions.pop}>back</Button>
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

export default connect(mapStateToProps)(Launch);

//
// module.exports = Launch;
