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

// this is a traditional React component connected to the redux store
class RecAddScreen extends Component {
  static navigatorStyle = {
    // statusBarColor: '#303F9F',
    // toolBarColor: '#3F51B5',
    // navigationBarColor: '#303F9F',
    // tabSelectedTextColor: '#FFA000',
    // tabNormalTextColor: '#FFC107',
    // tabIndicatorColor: '#FF4081'
  };

  static propTypes = {
    // str: PropTypes.string.isRequired,
    // obj: PropTypes.object.isRequired,
    // num: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.bgColor = this.getRandomColor();
    this.state = {recTitle:'dude'}
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <View style={{flex: 1, padding: 20, backgroundColor: this.bgColor}}>


        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(recTitle) => this.setState({recTitle})}
          value={this.state.recTitle}
        />

        <TouchableOpacity onPress={ this.onAddRecPress.bind(this) }>
          <Text style={styles.button}>Add Rec</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={ this.onDismissModal.bind(this) }>
          <Text style={styles.button}>Cancel</Text>
        </TouchableOpacity>

      </View>
    );
  }

  onAddRecPress() {
    this.props.dispatch(recActions.addRec(this.state.recTitle));
    this.props.navigator.dismissModal();
  }


  onDismissModal() {
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
    color: 'blue'
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    recs: state.recs
  };
}

export default connect(mapStateToProps)(RecAddScreen);
