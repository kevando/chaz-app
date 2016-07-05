import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
// import * as counterActions from '../reducers/counter/actions';
import * as recsActions from '../reducers/recs/actions';
import ListItem from '../components/recs/ListItem';

let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecsScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       title: 'Edit',
  //       id: 'edit'
  //     },
  //     {
  //       icon: require('../../img/navicon_add.png'),
  //       title: 'Add',
  //       id: 'add'
  //     }
  //   ]
  // };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // switch (event.id) {
    //   case 'edit':
    //     Alert.alert('NavBar', 'Edit button pressed');
    //     break;
    //
    //   case 'add':
    //     Alert.alert('NavBar', 'Add button pressed');
    //     break;
    //
    //   default:
    //     console.log('Unhandled event ' + event.id);
    //     break;
    // }
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20}}>



        {this.renderRecList(this.props.navigator)}



      </View>
    );
  }

  renderRecList(navigator) { // not sure if passing nav is a good idea but it works
    var recs = Array();
    this.props.recs.visible.forEach(function(rec) {
      recs.push(<ListItem key={rec._key} rec={rec} navigator={navigator} />);
    });
    return recs;
  }

//   onIncrementPress() {
//     this.props.dispatch(counterActions.increment());
//   }
//
//   onPushPress() {
//     this.props.navigator.push({
//       title: "More",
//       screen: "example.PushedScreen",
//       passProps: {
//         str: 'This is a prop passed in \'navigator.push()\'!',
//         obj: {
//           str: 'This is a prop passed in an object!',
//           arr: [
//             {
//               str: 'This is a prop in an object in an array in an object!'
//             }
//           ]
//         },
//         num: 1234
//       }
//     });
//   }
//
//   onShowModalPress() {
//     this.props.navigator.showModal({
//       title: "Modal Screen",
//       screen: "example.PushedScreen",
//       passProps: {
//         str: 'This is a prop passed in \'navigator.showModal()\'!',
//         obj: {
//           str: 'This is a prop passed in an object!',
//           arr: [
//             {
//               str: 'This is a prop in an object in an array in an object!'
//             }
//           ]
//         },
//         num: 1234
//       }
//     });
//   }
//
//   onToggleNavBarPress() {
//     navBarVisiable = !navBarVisiable;
//     this.props.navigator.toggleNavBar({
//       to: navBarVisiable ? 'shown' : 'hidden',
//       animated: true
//     });
//   }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

// which props do we want to inject, given the global state?
// kevin is not super sure about this
function mapStateToProps(state) {
  return {
    recs: state.recs,
    // counter: state.counter // this is like the entire folder level shit
  };
}

export default connect(mapStateToProps)(RecsScreen);
