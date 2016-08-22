// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AlertIOS,
  ActionSheetIOS
} from 'react-native';
import { connect } from 'react-redux';
// import AddRecButton from '../components/rec/AddRecButton';
// import * as recActions from '../reducers/rec/actions';

// import * as recrActions from '../reducers/recr/actions';
// import Loading from '../components/LoadingComponent';
// import Onboarding from '../containers/Onboarding';
// import FilterNav from '../containers/rec/FilterNav';
// import RecList from '../components/rec/RecList';
// import * as GlobalStyle from '../style/Style';

// var DeviceInfo = require('react-native-device-info');

// let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecList extends Component {



  constructor(props) {
    super(props);
    console.log('props from RecList',this.props)
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    // this.props.navigator.setTitle({ title: "chaz (v" +  DeviceInfo.getVersion() +")" });
  }


  componentDidMount() {
    // this.props.dispatch({type: 'SET_LOADED', loaded: false}); // reset the app awareness that listener is off
    // this.props.dispatch(recActions.listenForRecs()); // again i dont like this code here. but it works well
    // this.props.dispatch(recrActions.listenForRecrs()); // meh

  }
  componentWillMount() {

  }

  render() {

    return(<View><Text>Dude recLIst</Text></View>);

    // // Might want to take this out of the render function
    // var recsLoaded = this.props.rec.get('loaded');
    //
    // if(!recsLoaded){
    //   return (<Loading message="Loading Recs from Firebase" />);
    // }
    //
    // var recList = this.props.rec.getIn(['visible']);
    // var activeType = this.props.rec.getIn(['filters','type','active']);
    //
    // // if(recList.size == 0)
    //   // return(<Onboarding notify="You have no recs" guide="Press the button below to get started" />)
    //
    //
    // return (
    //   <View style={styles.container}>
    //     <FilterNav />
    //     <View style={{flex:9}} >
    //         <ScrollView><RecList recList={recList} navigator={this.props.navigator} /></ScrollView>
    //
    //     </View>
    //     <AddRecButton activeType={activeType} onPress={this.onAddRecPress.bind(this)} />
    //   </View>
    // );
  }
  // {( recList.size == 0
  //   ? <Onboarding notify="You have no recs" guide="Press the button below to get started" />
  //   : <ScrollView><RecList recList={recList} navigator={this.props.navigator} /></ScrollView>
  // )}



  onAddRecPress() {
    this.props.navigator.showModal({
      title: "",
      screen: "chaz.RecAddScreen",
      passProps: { }
    });
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderColor:GlobalStyle.constants.colors[1],
//
//   },
//   text: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginBottom: 10,
//     marginTop:10
//   },
//   button: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginBottom: 10,
//     marginTop:10,
//     color: 'blue'
//   }
// });

// which props do we want to inject, given the global state?
// kevin is not super sure about this
function mapStateToProps(state) {
  return {
    rec: state.rec,
    recr: state.recr,
    app: state.app,
    onboard: state.onboard
  };
}

export default connect(mapStateToProps)(RecList);
