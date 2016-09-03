import React, { Component } from 'react';
import {View, Text, StyleSheet,ScrollView, Dimensions,Animated} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import * as GlobalStyle from '../style/Global';
import OnboardProgress from '../components/OnboardProgress';
import {connect} from 'react-redux';

// for sending recs
import RecAddButton from '../components/RecAddButton';
import RecList from '../components/RecList';
import EmptyMessage from '../components/EmptyMessage';

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
  getVisibleRecs() { // this fn will probly be used elsewhere

    var activeFilter = this.props.app.get('activeFilter');
    // do something like this for filtered list
   //  var result = map.find(function(obj){return obj.get('id') === 4;});

   // Filter rec list by uid, only showing recs 'given' to me
   var uid = this.state.user.uid;
   var recsFromMe = this.props.recs.filter(function(obj){
    //  console.log('checking rec',obj.get('title'))
    //  console.log('rec_uid',obj.get('uid'))
    //  console.log('my__uid',uid)

     return obj.get('uid') != uid;

   });


    // First add the Recr data (probly a better place to do this)
  //  var recrs = this.props.recrs;

   var visibleRecs = recsFromMe;
  //  .map(function(rec) {
   //
  //    var recrId = rec.get('recr_id');
   //
  //    var recr = recrs.find(function(obj){
  //       return (obj.get('id') === recrId);
  //     });
  //     var recWithRecr = rec.set('recr', recr)
   //
  //    return recWithRecr;
   //
  //   });

   return visibleRecs;
  }

  render(){
    var visibleRecs = this.getVisibleRecs();
    var totalRecs = this.props.recs
    // var currentStep = this.props.onboard.get('currentStep'); // used for rendering the filter

    // if(recList.size == 0)
      // return(<EmptyMessage notify="You have no recs" instructions="Press the button below to get started" />)

    // return(<View><Text>current step: {currentStep}</Text></View>)

    return (
      <View style={styles.container}>

        <View style={{flex:10}} >
        {(totalRecs.size == 0
          ?
          <EmptyMessage title="No recs sent yet" notify="Nope. none" instructions="get started by.." />
          :
          <ScrollView><RecList recs={visibleRecs.reverse()} /></ScrollView>
        )}
        </View>
        <RecAddButton activeType={"default"} onPress={this.onAddRecPress.bind(this)} />
      </View>
    );
  }
  onAddRecPress(){
    Actions.recommendationAdd({uid:this.state.uid})
  }

  render_old(){
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
    onboard: state.onboard,
    recs: state.recs
  };
}

export default connect(mapStateToProps)(Profile);

//
// module.exports = Launch;
