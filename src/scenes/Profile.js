import React, { Component } from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions,Animated} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import * as GlobalStyle from '../style/Global';
import OnboardProgress from '../components/OnboardProgress';
import {connect} from 'react-redux';

const DeviceInfo = require('react-native-device-info');

var {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get("window");

import timer from 'react-native-timer';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight),
      user: this.props.app.get('user').toJS()
    };

    this.closeHandler = this.closeHandler.bind(this)

  }
  componentDidMount() {
    // Slide Up
    Animated.timing(this.state.offset, {
        duration: 150,
        toValue: 0
    }).start();

  }

  closeHandler() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: deviceHeight
    }
  ).start(Actions.pop)

  //actions.pop

  }
  render(){
    let {value,label} = GlobalStyle.styles;
    let user = this.state.user;

    return (
      <View style={[styles.container]}>
        <ScrollView >
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
          <View style={styles.row}>
            <View style={styles.left}><Text style={label}>ENV</Text></View>
            <View style={styles.right}><Text style={value}>{process.env.NODE_ENV}</Text></View>
          </View>


          <Button onPress={this.closeHandler.bind(this)} style={{fontSize:27,color:'blue',marginTop:30}}>Back</Button>
          <Button onPress={this.onLogoutPress.bind(this)} style={{fontSize:14,color:'red',marginTop:30}}>Logout</Button>
        </ScrollView>
      </View>
    );
  }

  onLogoutPress(){
    Actions.logout()
  }
}


const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(102,102,102,0.8)",
  },
  container: {
    // width: deviceWidth,
    flex: 1,
    flexDirection:'column',
    backgroundColor: "transparent",
    backgroundColor:"white",
    borderWidth:1,
    // marginBottom:70,
    paddingTop:30
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
