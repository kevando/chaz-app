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
      visibleHeight: Dimensions.get('window').height
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentDidMount() {
    console.log('componentdidmount, set textInput focus true');
    this.refs.TextInput.focus(true);

    // keyboard shit
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }
  keyboardWillShow (e) {                                         // minus nav height
    let newSize = Dimensions.get('window').height - e.endCoordinates.height-65
    this.setState({visibleHeight: newSize})
    console.log('keyboardWillShow with height',newSize)
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
    console.log('keyboardWillHide with height',Dimensions.get('window').height)
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
      <View style={{padding: 20,height: this.state.visibleHeight}}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1,paddingLeft:10}}
          onChangeText={(recTitle) => this.setState({recTitle})}
          value={this.state.recTitle}
          placeholder="What was recommended?"
          ref="TextInput"

        />
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={ this.onAddRecPress.bind(this) }>
            <Text style={styles.saveText}><Emoji name="floppy_disk" /> Recommendation</Text>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
  onInputChange() {

  }

  onAddRecPress() {
    this.props.dispatch(recActions.addRec(this.state.recTitle));
    // tmp disabling for now.
    // this.props.navigator.push({
    //   title: "",
    //   screen: "chaz.RecViewScreen",
    //   passProps: { currentRec: this.props.rec.current },
    //   animated:false
    // });
    this.props.navigator.dismissModal();

    // figure out a better way to have this pop up
    // def have this much more intelligent, not conditionals

    if(this.props.rec.getIn(['all']).size == 1) {
      this.props.navigator.showLightBox({
        screen: "chaz.OnboardPopup", // unique ID registered with Navigation.registerScreen
        style: {
          backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "#ffffff30", // tint color for the background, you can specify alpha here (optional)
        }
      });
    }
  }


  onCancelPress() {
    // would like to clear keyboard here first,
    // then used the onfocus event to dismiss the modal
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
    rec: state.rec
  };
}

export default connect(mapStateToProps)(RecAddScreen);
