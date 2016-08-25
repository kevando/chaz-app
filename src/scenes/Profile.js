import React, { Component } from 'react';
import {View, Text, StyleSheet,ScrollView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import * as GlobalStyle from '../style/Global';
import OnboardProgress from '../components/OnboardProgress';
import {connect} from 'react-redux';

const DeviceInfo = require('react-native-device-info');


// TMP
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('async-data-v1');

class Profile extends Component {

  render(){
    let {value,label} = GlobalStyle.styles;
    let user = this.props.app.get('user').toJS();
    // console.log('props',this.props.app.get('user')

    return (
      <ScrollView>

        <OnboardProgress onboard={this.props.onboard} />

        <View style={styles.rowHeader}>
          <View style={styles.left}><Text style={styles.rowTitle}>Settings</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}><Text style={label}>Name</Text></View>
          <View style={styles.right}><Text style={value}>{user.name}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}><Text style={label}>UID</Text></View>
          <View style={styles.right}><Text style={value}>{user.uid}</Text></View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}><Text style={label}>Version</Text></View>
          <View style={styles.right}><Text style={value}>{DeviceInfo.getReadableVersion()}</Text></View>
        </View>



        <Button onPress={this.clearStorage.bind(this)} style={{fontSize:28,color:'red',marginTop:30}}>Logout</Button>
      </ScrollView>
    );
  }
  clearStorage(){
    engine.save({});

    Actions.welcome();
    // this.props.dispatch({type:'USER_LOGOUT'});
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    flexDirection: 'column',
    justifyContent:'flex-start',
    // backgroundColor: 'yellow',
  },
  rowHeader: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    padding:4,
    backgroundColor: "#ddd",
    marginTop:25,
    paddingLeft:8
  },

  rowTitle: {
    fontSize:14,
    color: "#999",
    fontWeight:'600'
  },
  row: {
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    flexDirection:'row',
    padding:8,
    backgroundColor: "#fff"
  },
  left: {
    flex:2,
  },
  right: {
    flex:9,

  },
});

function mapStateToProps(state) {
  return {
    app: state.app,
    onboard: state.onboard
  };
}

export default connect(mapStateToProps)(Profile);

//
// module.exports = Launch;
