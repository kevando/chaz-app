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
import * as Style from '../style/Style';

let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecsScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    navBarBackgroundColor: Style.constants.colors[0],
    navBarTextColor: Style.constants.colors[1],
    navBarButtonColor: '#fff',
  };

  static navigatorButtons = {
    rightButtons: [{title: 'Friends',id: 'friends'}],
    leftButtons: [ {title: 'Settings',id: 'settings'}]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onAddRecrPress = this.onAddRecrPress.bind(this);
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
    this.props.dispatch(recActions.listenForRecs()); // again i dont like this code here
    this.props.dispatch(recrActions.listenForRecrs());
  }

  render() {

    if(!this.props.rec.all)
      return (<View><Text>No visible recs yet</Text></View>)

    return (
      <View style={{flex: 1, padding: 0}}>
      <ScrollView>
        {this.renderRecList(this.props.navigator,this.onAddRecrPress)}
        </ScrollView>
        <AddRecButton text="Add Recommendation" onPress={this.onAddRecPress.bind(this)} />
      </View>
    );
  }

  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
  }
  renderRecList(navigator,onAddRecrPress) { // not sure if passing nav is a good idea but it works
    var recs = Array();
    this.props.rec.all.forEach(function(rec) {

      recs.push(<ListItem key={rec._key} rec={rec} navigator={navigator} onAddRecrPress={onAddRecrPress.bind(this,rec)} />);
    });
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
      title: "Settings",
      screen: "chaz.SettingsScreen",
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
  };
}

export default connect(mapStateToProps)(RecsScreen);
