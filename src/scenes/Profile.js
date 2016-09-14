import React, { Component } from 'react';
import {View, Text, StyleSheet,ScrollView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {colors,fonts} from '../style/Global';
import OnboardProgress from '../components/OnboardProgress';
import {connect} from 'react-redux';

import DeviceInfo from 'react-native-device-info';

// meteor tmp stuff
import ddpClient from '../ddp';

import { changeSignInStatus } from '../reducers/app/actions';
import { addPost, setPosts } from '../reducers/post/actions';


class Profile extends Component {

  constructor(props) {
    super(props);
    // this.state = {user: this.props.app.get('user').toJS()};
    // this.closeHandler = this.closeHandler.bind(this)
  }

  componentWillMount(){
    Actions.refresh({rightTitle: "Logout", onRight:() => this.onLogoutPress(), rightButtonTextStyle: {color:colors.red} })
  }

  render(){
    let {value,label} = fonts;


    return (
      <View style={[styles.container]}>
        <ScrollView >
          <View>
            <Text style={fonts.title} >This is currently for debugging</Text>
          </View>


        </ScrollView>
      </View>
    );
  }

  render_og(){
    let {value,label} = fonts;
    let user = this.state.user;

    return (
      <View style={[styles.container]}>
        <ScrollView >
          <View>
            <Text style={fonts.title} >This is currently for debugging</Text>
          </View>
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

        </ScrollView>
      </View>
    );
  }

  closeHandler() {
    Actions.pop
  }

  onLogoutPress(){


    ddpClient.logout(() => {
      // this.props.changedSignedIn(false);
      this.props.dispatch(changeSignInStatus(false));
      
    });

  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: "transparent",
    backgroundColor:"white",
    borderWidth:0,
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
    onboard: state.onboard,
    recs: state.recs
  };
}

export default connect(mapStateToProps)(Profile);

//
// module.exports = Launch;
