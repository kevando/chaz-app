import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet,StatusBar, Text, View, TouchableOpacity, Alert, } from 'react-native';
import { colors, text } from '../config/styles';
import { Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Button } from './Generic'


// --------------------------------
// Close Button for InputTitle

export class CloseButton extends Component {

  _onClose() {
    Keyboard.dismiss()
    Actions.pop()
  }
  render() {
    return (
      <Icon onPress={this._onClose} name="x" size={25} style={[styles.buttonIcon,{marginTop: StatusBar.hidden ? -10 : 0,}]}/>
    )
  }
}

export class BackButton extends Component {
  render() {
    return (
      <Icon onPress={Actions.pop} name="arrow-left" size={25} style={[styles.buttonIcon,{marginTop: StatusBar.hidden ? -10 : 0,}]}/>
    )
  }
}

export class ProfileButton extends Component {

  _onPress(isAnonymous) {


    if(isAnonymous)
      Actions.push('Register')
    else
      Actions.push('Profile')
  }

  render() {
    const { myRecsCount,user:{isAnonymous} } = this.props

    if(myRecsCount < 2 ) { return null }

    return (
      <Icon
        onPress={()=>this._onPress(isAnonymous)}
        name={isAnonymous ? "user-plus" : "user"}
        size={25}
        style={[styles.buttonIcon,{marginTop: StatusBar.hidden ? -10 : 0,}]}
      />
    )
  }
}


const styles = StyleSheet.create({

  buttonIcon: {
    color: 'white',
    // backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },

});



// --------------------------------
// Dashboard Right button
// --------------------------------


class DashboardButtonContainer extends Component {


render() {
  const { app, myRecs, user } = this.props;

  // this should turn out to be pretty much the onboarding steps

  if(app.notificationPermission != "authorized" && myRecs.length > 0) {
    // STEP 1
    return (
      <Text>enable</Text>
    )
  }
  else if(myRecs.length > 0 && app.notificationPermission == "authorized" && !user.displayName) {

    // INVITE THE USER TO SIGN UP
    return (
      <Icon
        onPress={()=> Actions.push('Register')}
        name={"user"}
        size={20}
        color={colors.yellow}
        style={[styles.buttonIcon,{marginTop: StatusBar.hidden ? -10 : 0,}]}
      />
    )
  } else {
    return null
  }



}

};


const mapStateToProps = (state) => {
  return {
    app: state.app,
    myRecs: state.recommendations.myRecs,
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export const DashboardRightButton = connect(mapStateToProps, mapDispatchToProps)(DashboardButtonContainer);
