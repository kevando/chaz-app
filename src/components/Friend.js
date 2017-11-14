import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
// import styles from './styles';
import { colors, text, width } from '../config/styles';




// ---------------------------------------
//    NAME
// ---------------------------------------


export const Name = ({friend, onPress, fontSize=18 }) => {
  if(!friend) { console.log('no friend data, usually happens when updating rec'); return null; }

  const textStyles = [
    ...text,

    // props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    // props.title && {fontSize: 20,fontWeight: '600'}

    {
      fontSize,
      color: friend.uid ? colors.pink : colors.grey,
      fontWeight: '600',
    }

  ]
  let friendName = <Text style={textStyles}>{friend.name || friend.displayName}</Text>


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
          <Icon name={icon} size={90} color={friend.uid ? 'white' : colors.lightWhite} />

          <View style={headerStyles.textContainer}>

              <Text style={[headerStyles.text,{color: friend.uid ? 'white' : colors.lightWhite}]}>{friend.name}</Text>

            </View>
        </View>
    );
  }
};



const headerStyles = StyleSheet.create({
  container: {
    // height: 150,
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: colors.blueBG,
    borderBottomWidth: 0,
    borderBottomColor: colors.blueBG,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: colors.blueBG,
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // zIndex:999
  },
  textContainer: {
    backgroundColor: colors.blueBG,
    width,
    marginTop: 0,
    paddingTop: 10,
    marginBottom: 10
  },
  text: {
    ...text,
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',

  }

})
