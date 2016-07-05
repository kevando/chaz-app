import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import * as counterActions from '../reducers/counter/actions';
import * as appActions from '../reducers/app/actions';
import Loading from '../components/LoadingComponent';

// this is a traditional React component connected to the redux store
class SettingsScreen extends Component {

  static propTypes = {
    str: PropTypes.string.isRequired,
    obj: PropTypes.object.isRequired,
    num: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    // this.state = {loading: false, authResponse: 'f'}
  }

  render() {


    return (
      <View style={{flex: 1, padding: 20}}>
      <Text style={styles.text}>
        <Text style={{fontWeight: '500'}}>Settings</Text>
      </Text>


        <TouchableOpacity onPress={ this.onLogoutPress.bind(this) }>
          <Text style={{fontWeight: '100',color:'red'}}>Logout</Text>
        </TouchableOpacity>



      </View>
    );
  }

  onLogoutPress() {
    this.props.dispatch(appActions.logout());
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
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
    // counter: state.counter,
    app: state.app
  };
}

export default connect(mapStateToProps)(SettingsScreen);
