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
import AddRecButton from '../components/rec/AddRecButton';
import * as recActions from '../reducers/rec/actions';
import * as recrActions from '../reducers/recr/actions';
import ListItem from '../components/rec/ListItem';
import Loading from '../components/LoadingComponent';
import Onboarding from '../components/Onboarding';
import RecList from '../components/rec/RecList';
import * as Style from '../style/Style';


var DeviceInfo = require('react-native-device-info');

let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecsScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    navBarBackgroundColor: Style.constants.colors[0],
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
  };

  static navigatorButtons = {
    // rightButtons: [{title: 'Friends',id: 'friends'}],
    leftButtons: [ {title: 'Profile',id: 'settings'}]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onAddRecrPress = this.onAddRecrPress.bind(this);

    this.props.navigator.setTitle({
      title: "chaz " +  DeviceInfo.getVersion()
    });

  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'friends':
        this.onShowFriendsPress()
        break;
      case 'settings':
        this.onShowSettingsPress()
        break;
      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }
  componentDidMount() {
    this.props.dispatch({type: 'SET_LOADED', loaded: false}); // reset the app awareness that listener is off
    this.props.dispatch(recActions.listenForRecs()); // again i dont like this code here. but it works well
    // this.props.dispatch(recrActions.listenForRecrs());
  }

  render() {
    // return(<View><Text>tmp rec screen</Text></View>);

    var recsLoaded = this.props.rec.get('loaded');

    if(!recsLoaded){
      console.log('Recs are NOT loading from firebase into redux');
      return (<Loading message="Loading Recs from Firebase" />);
    }

    var recList = this.props.rec.getIn(['all']);
    console.log('recList',recList);

    return ( // gotta add scrollview back in
      <View style={{flex: 1, padding: 0}}>
        {( recList.size == 0
          ? <Onboarding notify="You have no recs" guide="Press the button below to get started"/>
          : <ScrollView><RecList recList={recList} /></ScrollView>
        )}
        <AddRecButton text="Add Recommendation" onPress={this.onAddRecPress.bind(this)} />
      </View>
    );
  }

  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
  }
  renderRecList(navigator,onAddRecrPress) {
    // not sure if passing nav is a good idea but it works
    // Also, this should probly be its own component. change that when i add the visible recs thing
    var recList = this.props.rec.getIn(['all']);
    // console.log('recList',recList);
    var recs = recList.map((Rec) => {
      var rec = Rec.toJS();
      return ((<ListItem key={rec._key} rec={rec} navigator={navigator} onAddRecrPress={onAddRecrPress.bind(this,rec)} />))
    });

    console.log('recs',recs)
    return recs;
  }

  onAddRecPress() { // add
    this.props.navigator.showModal({
      title: "",
      screen: "chaz.RecAddScreen",
      passProps: { }
    });
  }
  onShowSettingsPress() {
    this.props.navigator.push({
      title: "Profile",
      screen: "chaz.ProfileScreen",
    });
  }
  onShowFriendsPress() {
    this.props.navigator.push({ screen: "chaz.RecrsScreen"});
  }
  onAddRecrPress(itemRec) {
    // Before adding recr name, set this listItem Rec to current.
    // this is not the best place for this, but its needed to add recr
    // this.props.dispatch(recActions.setCurrentRec(itemRec));
    //
    // var options = Array();
    // options.push({text: 'Add New',  onPress: (recrName) => { this.addRecr(recrName) }    });
    // options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    // AlertIOS.prompt('Who is recommending this?', null, options);
    console.log(this.props)
    var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 2;
ActionSheetIOS.showActionSheetWithOptions({
      title: 'title',
      message: 'message',
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });

  }
  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
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
    recr: state.recr,
    app: state.app,
  };
}

export default connect(mapStateToProps)(RecsScreen);
