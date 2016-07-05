import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';
import * as recActions from '../reducers/rec/actions';


let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecViewScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Edit',
        id: 'edit'
      },
      {
        icon: require('../../img/navicon_add.png'),
        title: 'Add',
        id: 'add'
      }
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    //Before doing anything, lets try something. lets make this an active rec or something
    console.log('setting active rec');
    this.props.dispatch(recActions.setCurrentRec(this.props.rec)); // maybe just do the key here
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
    const rec = this.props.rec.current;

    if(!rec)
      return(<View><Text>Something went wrong and no current rec was set</Text></View>);

    return (
      <View style={{flex: 1, padding: 20}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>{rec.title}</Text>
        </Text>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>rec: {rec.grade}</Text>
        </Text>

        <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
          <Text style={styles.button}>Who Recommended this?</Text>
        </TouchableOpacity>


        <Text style={styles.text}>
          <Text style={{fontWeight: '500'}}>grade: {rec.grade}</Text>
        </Text>

        <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
          <Text style={styles.button}>Grade this</Text>
        </TouchableOpacity>





      </View>
    );
  }



  onAddGradePress(rec) {
    // const setRecGrade = this.props.dispatch(recActions.setRecGrade(rec,1));
    // const { setRecGrade, removeRec } = this.props.actions;
    AlertIOS.alert(
        'Grade this recommendation',
        null,
        [
          {text: '1 Stars', onPress: (text) => this.props.dispatch(recActions.setRecGrade(rec,1)) },
          {text: '2 Stars', onPress: (text) => this.props.dispatch(recActions.setRecGrade(rec,2)) },
          {text: '3 Stars', onPress: (text) => this.props.dispatch(recActions.setRecGrade(rec,3)) },
          {text: '4 Stars', onPress: (text) => this.props.dispatch(recActions.setRecGrade(rec,4)) },
          {text: '5 Stars', onPress: (text) => this.props.dispatch(recActions.setRecGrade(rec,5)) },
          // {text: 'Delete Rec', onPress: (text) => removeRec(rec._key)},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
  }
  onAddRecrPress() {
    var options = Array();
    options.push({text: 'Add New',  onPress: (recr) => { this.props.dispatch(recActions.setRecRecr(rec,recr)) }    });
    // var recrs = this.props.recrs.map((recr) => {
    //   options.push({text: recr.name, onPress: () => {this.props.assignExistingRecrFunction(recr,this.props.rec)} });
    // });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });

    AlertIOS.prompt('Who recommended this?', null, options);
  }

  onPushPress() {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.push()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

  onShowModalPress() {
    this.props.navigator.showModal({
      title: "Modal Screen",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.showModal()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

  onToggleNavBarPress() {
    navBarVisiable = !navBarVisiable;
    this.props.navigator.toggleNavBar({
      to: navBarVisiable ? 'shown' : 'hidden',
      animated: true
    });
  }
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
    rec: state.rec,
  };
}

export default connect(mapStateToProps)(RecViewScreen);
