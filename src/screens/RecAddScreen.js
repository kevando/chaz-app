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
import * as Style from '../style/Style';

// this is a traditional React component connected to the redux store
class RecAddScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    navBarBackgroundColor: Style.constants.colors[1],
    navBarButtonColor: '#fff',
  };

  static navigatorButtons = {
    rightButtons: [{title: 'Cancel',id: 'cancel'}],
  };

  constructor(props) {
    super(props);
    this.state = {
      recTitle:'',
      recNote:'',
      recType: '',
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

    // consider a better way to do this onboard conditional here
    if(this.props.onboard.get('currentStep') == 1)
      this.props.dispatch({type: 'INCREMENT_CURRENT_STEP'}); // Show tutorial message
    else {
      this.refs.TitleInput.focus(true); // dont auto show keyboard with popup
    }

    // keyboard shit
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    // Disabling these 2 events for now, not sure if I need them at all
    // DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    // DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))

    // set recType
    const recType = (this.props.rec.getIn(['filters','type','active']) != 'all' ? this.props.rec.getIn(['filters','type','active']) : 'default');
    this.setState({type: recType})
    this.props.navigator.setTitle({
      title: "New Recommendation" // the new title of the screen as appears in the nav bar
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
          onChangeText={(recTitle) => this.setState({recTitle})}
          value={this.state.recTitle}
          placeholder={"What "+ this.state.type +" being recommended?"}
          ref="TitleInput"
          enablesReturnKeyAutomatically={true}
          returnKeyType={'done'}
          onSubmitEditing={this.onAddRecPress.bind(this)}
        />
        <View style={{borderTopColor:'#ccc',borderTopWidth:1}}>
        <TextInput
          style={{fontSize:15,height: 40,paddingLeft:10}}
          onChangeText={(recNote) => this.setState({recNote})}
          value={this.state.recNote}
          placeholder="Add a note about this moment..."
          ref="NoteInput"
          returnKeyType={'done'}
          onSubmitEditing={this.onAddRecPress.bind(this)}
        />
        </View>
        {( this.state.recTitle == ''
        ?
        null
        :
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={ this.onAddRecPress.bind(this) }>
            <Text style={styles.saveText}><Emoji name="floppy_disk" /> Recommendation</Text>
          </TouchableOpacity>
        </View>

        )}



      </View>
    );
  }

  onAddRecPress() {
    this.props.dispatch(recActions.addRec(this.state.recTitle,this.state.recNote));

    // figure out a better way to have this onboarding pop up
    // def have this much more intelligent, not conditionals

    // if(this.props.rec.getIn(['all']).size == 1) {
    if(this.props.onboard.get('currentStep') == 2)
      this.props.dispatch({type: 'INCREMENT_CURRENT_STEP'}); // Show tutorial message


    // get recKey of most recent rec, the last one added just here
    var recList = this.props.rec.get('all');
    var lastRecKey = recList.last().get('_key'); // need key of most recent rec

    this.props.navigator.push({
      title: "Recommendation",
      screen: "chaz.RecViewScreen",
      passProps: { recKey: lastRecKey },
      animated:true,
      navigatorButtons: {leftButtons: [{title: 'Done',id: 'pop'}]},
    });
  }


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
    onboard: state.onboard
  };
}

export default connect(mapStateToProps)(RecAddScreen);
