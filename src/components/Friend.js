import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text } from '../config/styles';




// ---------------------------------------
//    NAME
// ---------------------------------------


export const Name = ({friend, onPress, small, large}) => {
  if(!friend) { console.warn('no friend data'); return null; }

  // const fontSize = small ? 10 : large ? 30 : 29

  const textStyles = [
    ...text,

    // props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    // props.title && {fontSize: 20,fontWeight: '600'}

    {
      fontSize: 18,
      color: friend.uid ? colors.pink : colors.grey,
      fontWeight: '600',
    }

  ]
  let friendName = <Text style={textStyles}>{friend.name}</Text>


  if(onPress) {
    return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      {friendName}
    </TouchableOpacity>
  )
  } else {
    return friendName
  }


}

// ---------------------------------------
// Top of FriendView
// ---------------------------------------

export class Header extends Component {

  render() {
    const { friend } = this.props;
    return (
      <View style={headerStyles.container}>

          <View style={headerStyles.textContainer}>

              <Text style={headerStyles.text}>{friend.name}</Text>
            </View>
          </View>
    );
  }
};



const headerStyles = StyleSheet.create({
  container: {
    height: 80,
    marginBottom: 50,
    paddingBottom: 30,
    backgroundColor: colors.blueBG,
    borderBottomWidth: 1,
    borderBottomColor: colors.newBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // borderColor: 'red',
    borderWidth: 5,
    backgroundColor: 'transparent',
    height: 40,
    width: 240,
    borderRadius: 40,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 2,
    shadowOpacity: 1.0
  },
  text: {
    ...text,
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  }

})
