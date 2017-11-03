import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet,StatusBar, Text, View, TouchableOpacity, Alert, } from 'react-native';
import { colors, text } from '../config/styles';
import { Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
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


const ICON_CONTAINER = 35
const styles = StyleSheet.create({

  buttonIcon: {
    color: 'white',
    // backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  navIconContainer: {
    height: ICON_CONTAINER,
    width: ICON_CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1,
    marginHorizontal: 4,
    marginTop: -5
  },
  navIcon: {
    // flex: 1,

    // padding:5,

  }

});



// --------------------------------
// Dashboard Right button
// --------------------------------


class DashboardButtonContainer extends Component {


render() {
  const { app, myRecs, user } = this.props;

  // user.providerData.length > 0 && console.warn('we are a real user, bitchin')
  // console.warn(app.notificationPermission)
  // console.warn(app.isAnon)

  // this should turn out to be pretty much the onboarding steps
  let buttonIcons = []

  // buttonIcons.push(
  //   <Icon
  //     name={"mail"}
  //     size={20}
  //     color={colors.yellow}
  //     style={[styles.navIcon,{color: colors.yellow, marginTop: StatusBar.hidden ? -10 : 0,}]}
  //   />)

  if(app.notificationPermission != "authorized" && myRecs.length > 0) {
    // STEP 1
    buttonIcons.push(
      <Icon
        name={"bell"}
        size={20}
        color={colors.yellow}
        style={[styles.navIcon,{color: colors.yellow, marginTop: StatusBar.hidden ? -10 : 0,}]}
      />
    )
  }
  else if(myRecs.length > 0 && app.notificationPermission == "authorized" && app.isAnon) {

    // INVITE THE USER TO SIGN UP
    buttonIcons.push (
      <Icon
        onPress={()=> Actions.push('Register')}
        name={"users"}
        size={25}
        color={colors.yellow}
        style={[styles.navIcon,{color: colors.yellow, marginTop: StatusBar.hidden ? -10 : 0,}]}
      />
    )
  } else if(myRecs.length > 0 && !app.isAnon) {
    // LET USER ACCESS THEIR ACCOUNT
    buttonIcons.push (
      <Icon
        onPress={()=> Actions.push('Profile')}
        name={"user"}
        style={[styles.navIcon,{color: 'rgba(255,255,255,0.5)', fontSize: 20,marginTop: StatusBar.hidden ? -10 : 0,}]}
      />
    )

  } else {

  }

  return (
    <View style={{flexDirection: 'row'}}>
      {_.map(buttonIcons,(icon,i) => <View style={styles.navIconContainer} key={i}>{icon}</View>)}
    </View>
  )

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
