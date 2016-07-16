import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
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
    this.state = {recTitle:''}
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  componentDidMount() {
    console.log('componentdidmount')
    this.refs.TextInput.focus(true);
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
    console.log('render')
    return (
      <View style={{flex: 1, padding: 20}}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(recTitle) => this.setState({recTitle})}
          value={this.state.recTitle}
          ref="TextInput"

        />

        <TouchableOpacity onPress={ this.onAddRecPress.bind(this) }>
          <Text style={styles.button}>Save Recommendation</Text>
        </TouchableOpacity>


      </View>
    );
  }

  onAddRecPress() {
    this.props.dispatch(recActions.addRec(this.state.recTitle));
    this.props.navigator.push({
      title: "",
      screen: "chaz.RecViewScreen",
      passProps: { currentRec: this.props.rec.current }
    });
    // this.props.navigator.dismissModal();
  }


  onCancelPress() {
    // would like to clear keyboard here first,
    // then used the onfocus event to dismiss the modal
    this.props.navigator.dismissModal();
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
    color: Style.constants.colors[1]
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    rec: state.rec
  };
}

export default connect(mapStateToProps)(RecAddScreen);
