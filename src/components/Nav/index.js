import React, {Component} from 'react';
import {Button, Keyboard, StyleSheet,StatusBar } from 'react-native';
import { colors, text } from '../../config/styles';
import { Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';


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
