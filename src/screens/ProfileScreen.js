import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import * as appActions from '../reducers/app/actions';
import Badge from '../components/feedback/Badge';
import * as GlobalStyle from '../style/Global';

// this is a traditional React component connected to the redux store
class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { // eventually pull this from firebase
      message: "Hey guys, I hope you like the updates. I think I will have a better way to manage this going forward. Adios for now."
    }
  }

  render() {

    return (
      <View style={{flex: 1, padding: 20,backgroundColor:'#ddd'}}>
        <Text style={GlobalStyle.styles.title}>
          A message from Kevando:
        </Text>

        <View style={{borderColor:'#ccc',borderWidth:1,backgroundColor:'#eee',padding:10,marginTop:5}} >
          <Text style={GlobalStyle.styles.text}>
            {this.state.message}
          </Text>
        </View>

        <View style={{marginTop:30}}>
          <Text>Device ID:</Text>
          <Text style={{fontWeight: '400',fontSize:14}}>{ DeviceInfo.getUniqueID() }</Text>
          <TouchableOpacity onPress={ this.onLogoutPress.bind(this) }>
            <Text style={{fontWeight: '100',color:'red'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onLogoutPress() {
    this.props.dispatch(appActions.logout());
  }

}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(ProfileScreen);
