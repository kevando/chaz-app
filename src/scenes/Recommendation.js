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

class RecView extends Component {


  componentDidMount() {
    // put this somewhere more universal
    // console.log('IM SO COOL IM A POPUP');
    // Actions.popup(this.props.app.get('welcomeMessage'));

  }

  render(){
    console.log('REC',this.props)
    return (
      <View {...this.props}  style={styles.container}>
        <Text>Rec View: </Text>
        <Text>------------------------</Text>
        <Text>profile page</Text>

      </View>
    );
  }

}


function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(RecView);

//
// module.exports = Launch;
