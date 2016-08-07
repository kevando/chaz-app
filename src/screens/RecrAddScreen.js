import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard'; // might not be safe
import { connect } from 'react-redux';
import Emoji from 'react-native-emoji';
import * as recActions from '../reducers/rec/actions';
import * as recrActions from '../reducers/recr/actions';
import * as Style from '../style/Style';

// this is a traditional React component connected to the redux store
class RecrAddScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    navBarBackgroundColor: Style.constants.colors[2],
    navBarButtonColor: '#fff',
  };

  static navigatorButtons = {
    rightButtons: [{title: 'Cancel',id: 'cancel'}],
  };

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      visibleHeight: Dimensions.get('window').height
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  static navigatorStyle = {
    navBarTextColor: '#000000', // change the text color of the title (remembered across pushes)
    navBarBackgroundColor: '#f7f7f7', // change the background color of the nav bar (remembered across pushes)
    navBarButtonColor: '#DB4049', // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
    navBarHidden: false, // make the nav bar hidden
  };
  componentDidMount() {
    this.refs.TitleInput.focus(true);
    // keyboard shit
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    // Disabling these 2 events for now, not sure if I need them at all
    // DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    // DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    // set recType
    const recType = (this.props.rec.getIn(['filters','type','active']) != 'all' ? this.props.rec.getIn(['filters','type','active']) : 'default');
    this.setState({type: recType})
    this.props.navigator.setTitle({
      title: "New Recr" // the new title of the screen as appears in the nav bar
    });
  }
  keyboardWillShow (e) {                                         // minus nav height
    let newSize = Dimensions.get('window').height - e.endCoordinates.height-65
    this.setState({visibleHeight: newSize})
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
  }
  componentWillUnmount () {
    DeviceEventEmitter.removeAllListeners();
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'cancel':
        this.onCancelPress()
        break;
      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }

  render() {

    return (
      <View style={{padding: 0,height: this.state.visibleHeight}}>

        <TextInput
          style={{height: 40, paddingLeft:10}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          placeholder={"Who recommended? the thing"}
          ref="RecrInput"
          enablesReturnKeyAutomatically={true}
          returnKeyType={'done'}
          onSubmitEditing={this.onAddRecrPress.bind(this)}
        />
        <View style={{borderTopColor:'#ccc',borderTopWidth:1}}>

        </View>
        {( this.state.name == ''
        ?
        null
        :
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={ this.onAddRecrPress.bind(this) }>
            <Text style={styles.saveText}> Save recr</Text>
          </TouchableOpacity>
        </View>

        )}



      </View>
    );
  }

  onAddRecrPress() {
    this.props.dispatch(recrActions.addRecr(this.state.name));

    // figure out a better way to have this onboarding pop up
    // def have this much more intelligent, not conditionals

    // if(this.props.rec.getIn(['all']).size == 1) {
    //   this.props.navigator.showLightBox({
    //     screen: "chaz.OnboardPopup", // unique ID registered with Navigation.registerScreen
    //     style: {
    //       backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
    //       backgroundColor: "#ffffff30", // tint color for the background, you can specify alpha here (optional)
    //     }
    //   });
    // }

    // get recKey of most recent rec, the last one added just here
    // var recList = this.props.rec.get('all');
    // var lastRecKey = recList.last().get('_key'); // need key of most recent rec

    // this.props.navigator.push({
    //   title: "Recommendation",
    //   screen: "chaz.RecViewScreen",
    //   passProps: { recKey: lastRecKey },
    //   animated:true,
    //   navigatorButtons: {leftButtons: [{title: 'Done',id: 'pop'}]},
    // });
    // this.props.navigator.dismissModal();
  }


  // subscribe to new recr? for the assign part


  onCancelPress() { // might reconsider how this is done
    dismissKeyboard();
    this.props.navigator.dismissModal();
  }

  keyboardDidHide() {
    this.props.navigator.dismissModal();
  }


}

const styles = StyleSheet.create({
  buttonContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-end',

  },
  saveButton: {
    backgroundColor: Style.constants.colors[1],

  },
  saveText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: "#fff"
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    rec: state.rec,
    recr: state.recr
  };
}

export default connect(mapStateToProps)(RecrAddScreen);
