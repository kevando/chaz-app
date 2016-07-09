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
    this.state = {recTitle:'dude'}
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
      <View style={{flex: 1, padding: 20}}>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(recTitle) => this.setState({recTitle})}
          value={this.state.recTitle}
        />

        <TouchableOpacity onPress={ this.onAddRecPress.bind(this) }>
          <Text style={styles.button}>Save Recommendation</Text>
        </TouchableOpacity>


      </View>
    );
  }

  onAddRecPress() {
    this.props.dispatch(recActions.addRec(this.state.recTitle));
    this.props.navigator.dismissModal();
  }


  onCancelPress() {
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
    recs: state.recs
  };
}

export default connect(mapStateToProps)(RecAddScreen);
