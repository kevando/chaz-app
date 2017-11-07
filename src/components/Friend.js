import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
// import styles from './styles';
import { colors, text, width } from '../config/styles';




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
    let icon = (friend.invitedAt ? 'navigation' : 'user')

    return (
      <View style={headerStyles.container}>
          <Icon name={icon} size={90} color={'rgba(255,255,255,0.4)'} />

          <View style={headerStyles.textContainer}>

              <Text style={headerStyles.text}>{friend.name}</Text>

            </View>
        </View>
    );
  }
};



const headerStyles = StyleSheet.create({
  container: {
    // height: 150,
    marginBottom: 50,
    paddingBottom: 0,
    backgroundColor: colors.newBlue,
    borderBottomWidth: 0,
    borderBottomColor: colors.newBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // borderColor: 'red',
    // borderWidth: 5,
    backgroundColor: colors.blueBG,
    width,
    marginTop: 30,
    paddingTop: 20,
    marginBottom: 0

  },
  text: {
    ...text,
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    color: colors.yellow
  }

})
