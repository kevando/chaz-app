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
import Badge from '../components/feedback/Badge';

// this is a traditional React component connected to the redux store
class ProfileScreen extends Component {


  constructor(props) {
    super(props);
    // this.state = {loading: false, authResponse: 'f'}

  }

  render() {
    if(!this.props.app.authData)
      return (<Text>Logged out</Text>);
    var email = this.props.app.authData.password.email;
    var atIndex = email.indexOf('@');
    var username = email.substring(0,atIndex);
    return (
      <View style={{flex: 1, padding: 20,backgroundColor:'#ddd'}}>
      <Text style={styles.text}>
        <Text style={{fontWeight: '500'}}>username: { username }</Text>
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
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
  },
  button: {
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

export default connect(mapStateToProps)(ProfileScreen);
