import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet,StatusBar, Text, View, TouchableOpacity, Alert, } from 'react-native';
import { colors, text } from '../config/styles';
import { Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Button } from './Generic'
import * as Animatable from 'react-native-animatable'
import EnableNotifications from './EnableNotifications'


// --------------------------------
//  Close Button for InputTitle
// --------------------------------

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

// --------------------------------
//  BACK BUTTON
// --------------------------------

export class BackButton extends Component {

  _goBack = () => {
    Actions.pop()
  }

  render() {
    return (
      <TouchableOpacity onPress={this._goBack} style={[styles.buttonContainer,{marginLeft: 15}]}>
        <Icon name="arrow-left" size={30} style={[styles.buttonIcon,]}/>
      </TouchableOpacity>
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




// --------------------------------------------------------
//      NAV BUTTON
// --------------------------------------------------------

const NavButton = ({onPress,icon,color=colors.lightWhite,size=25}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{padding:5,backgroundColor:'transparent'}}>
      <Icon
        name={icon}
        size={size}
        style={[styles.navIcon,{color: color, marginTop: StatusBar.hidden ? -10 : 0,}]} />
    </TouchableOpacity>
  )
}

 // --------------------------------------------------------
class DashboardButtonContainer extends Component {


render() {
  const { app, myRecs, user, reminders, openRecs, openInvitations, inbox } = this.props;

  const debug = app.devMode
  const god = user.displayName == 'kevo'
  // this should turn out to be pretty much the onboarding steps
  let buttonIcons = []


  // ---------------------
  //    NOTIFICATIONS
  // ---------------------
  if(debug || app.notificationPermission != "authorized" && myRecs.length > 0 ) {
    buttonIcons.push(
      <Animatable.View animation="swing" iterationCount={'infinite'} duration={2000}>
        <NavButton onPress={Actions.Reminders} icon="bell" size={25} color={colors.yellow} />
      </Animatable.View>
    )
  }

  // ---------------------
  //    REGISTER
  // ---------------------
  if(debug || myRecs.length > 0 && app.notificationPermission == "authorized" && app.isAnon) {
    buttonIcons.push (
      <Animatable.View animation="tada" iterationCount={'infinite'} duration={3000}>
        <NavButton onPress={()=> Actions.push('Register')} icon="zap" color={colors.yellow} />
      </Animatable.View>
    )
  }

  // ---------------------
  //    ACTIVATED
  // ---------------------
  if(debug || app.notificationPermission == "authorized" && !app.isAnon) {

    // INVITE THE USER TO SIGN UP
    buttonIcons.push (
      <NavButton onPress={Actions.Register} icon="heart" color={colors.lightWhite} />
    )
  }

  // ---------------------
  //    PROFILE
  // ---------------------
  if(debug || !app.isAnon) {
    buttonIcons.push (
      <NavButton onPress={Actions.Profile} icon="user" />
    )
  }

  // ---------------------
  //    INBOX
  // ---------------------
  if(debug || inbox.length > 0 && openRecs.length > 0) {
    buttonIcons.push (
      <Animatable.View animation="tada" iterationCount={'infinite'} duration={3000}>
        <NavButton onPress={()=> Actions.push('Inbox')} icon="inbox" color={colors.yellow} />
      </Animatable.View>)
  } else if (debug || inbox.length > 0) {
    buttonIcons.push (
        <NavButton onPress={()=> Actions.push('Inbox')} icon="inbox" color={colors.lightWhite} />)
  }


  // ---------------------
  // INVITATIONS
  // ---------------------
  if(debug || openInvitations.length > 0) {
    buttonIcons.push (
      <NavButton onPress={Actions.Invites} icon="navigation" color={colors.yellow}/>
    )
  }

  // ---------------------
  // DEBUG SETTINGS
  // ---------------------
  if( debug || app.devMode) {
    buttonIcons.push (<NavButton onPress={()=> Actions.push('Settings')} icon="settings" color={colors.lightWhite} />)
  }

  // ---------------------
  // GOD VIEW
  // ---------------------
  if( debug || god) {
    buttonIcons.push (<NavButton onPress={Actions.GodView} icon="gitlab" color={colors.white} />)
  }


  return (
    <View style={{flexDirection: 'row', marginRight: 12,marginTop: 10}}>
      {_.map(buttonIcons,(icon,i) => <View style={styles.navIconContainer} key={i}>{icon}</View>)}
    </View>
  )

}

};


const mapStateToProps = (state) => {
  return {
    app: state.app,
    // openRecs: _.filter(state.recommendations.myRecs,rec => rec.status == "open"),
    openRecs: state.recommendations.openRecs,
    openInvitations: _.filter(state.recommendations.givenRecs,rec => rec.status == "open"),
    myRecs: state.recommendations.myRecs,
    inbox: state.recommendations.inbox,
    user: state.user,
    reminders: state.reminders,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export const DashboardRightButton = connect(mapStateToProps, mapDispatchToProps)(DashboardButtonContainer);


const ICON_CONTAINER = 35
const styles = StyleSheet.create({

  buttonContainer: {
    height: ICON_CONTAINER,
    width: ICON_CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 10,
    // borderWidth: 1,
    // borderColor: 'blue',
    // borderRadius: 30,
    // backgroundColor: 'blue',
    overflow: 'hidden',
  },

  buttonIcon: {
    color: 'white',
    // backgroundColor: 'blue',
  },
  navIconContainer: {
    height: ICON_CONTAINER,
    width: ICON_CONTAINER,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 1,
    marginHorizontal: 4,
    marginTop: 10
  },
  navIcon: {
    // flex: 1,

    // padding:5,

  }

});



//
//
// const TEST_ANIMATIONS = [
//   {animation: "tada", iterationCount: 'infinite', duration: 5000, color: colors.yellow },
//   // {animation: "jello", iterationCount: 'infinite', duration: 2000,color: colors.yellow},
//   // {animation: "rubberBand", iterationCount: 'infinite', duration: 2000,color: colors.lightWhite},
//
//   // {animation: "swing", iterationCount: 'infinite', duration: 2000,color: 'white'},
//   // {animation: "pulse", iterationCount: 'infinite', duration: 200,color: 'green'},
//   // {animation: "flash", iterationCount: 'infinite', duration: 9000,color: 'orange'},
//
//   // intense
//   // {animation: "shake", iterationCount: 'infinite', duration: 2000},
//   // {animation: "wobble", iterationCount: 'infinite', duration: 2000},
//
//   // {animation: "slideInDown", iterationCount: 'infinite', duration: 2000,color: 'red',direction: 'alternate'},
//   // {animation: "zoomIn", iterationCount: 'infinite', duration: 2000,color: 'red',direction: 'alternate'},
//
// ]
//
//
//   // TEST ICONS
//   // _.forEach(TEST_ANIMATIONS, config => buttonIcons.push(<Animatable.View {...config}><Icon name="inbox" size={25} style={[styles.navIcon,{ color: config.color,marginTop: StatusBar.hidden ? -10 : 0,}]} /></Animatable.View>))
