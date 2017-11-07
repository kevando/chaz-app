import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import _ from 'lodash'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather'
import styles from './styles';
import { UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Card } from '../../components/Rec'
import { Label, Button } from '../../components/Generic/';
import { PhoneInput } from '../../components/Input';
import * as Animatable from 'react-native-animatable'

const Invite = (props) => {

  const { friend, app, invitation, updateState, updateFriend, searchUsers, phoneNumber, userFound, user,assignFriend, validPhoneNumber, sendInvite } = props

  let UserFound = () => {
    return (
    <View style={styles.container}>
      <Label center large>Connected!</Label>
      <View style={{alignItems: 'center',justifyContent:'center',paddingBottom:30}}>
        <Label center>You are now connected!</Label>
        <Animatable.View animation="fadeInLeft" easing="ease-out-circ" delay={1000} duration={1500} style={{backgroundColor: 'transparent'}}>
          <Icon name="user" size={100} color="white" />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" easing="ease-out-circ" delay={1000} duration={1500} style={{marginTop: -100,backgroundColor: 'transparent'}}>
            <Icon name="user" size={100} color="white" />
            </Animatable.View>
        </View>

      </View>
    )
  }

  let InvitationSent = () => {
    return (
    <View style={styles.container}>
      <Label center large>Invitation Sent</Label>
        <Label center>You invited this {friend.name}. Nice. Lets hope {friend.name} accepts.</Label>
      </View>
    )
  }

  let SendInvitation = () => {
    return (
    <View style={styles.container}>
      <Label center large>Nobody found</Label>
        <Label center>{friend.name} did not activate an account with {friend.phoneNumber}. Lets invite them!</Label>
        <TouchableOpacity onPress={()=>updateFriend(friend,{searchResults: null})}><Label center>Try a different number</Label></TouchableOpacity>
      </View>
    )
  }
  let Connect = () => {
    return (
    <View style={styles.container}>
      <Label center large>{friend.name} has chaz!</Label>
        <Label center>{friend.phoneNumber} is correct and this person is on chaz.</Label>
        <Label center>Connecting will notify them</Label>

      </View>
    )
  }
  let PhoneNumberSearch = () => {
    return (
    <View style={styles.container}>
      <Label center large>Find {friend.name}</Label>
      <Label center>Enter {friend.name}'s phone number.</Label>
      <PhoneInput {...props} />

      </View>
    )
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Actions.pop} style={styles.closeButton}>
        <Icon name="x" size={25} color="white"/>

      </TouchableOpacity>

      {
        friend.uid ?
          <UserFound />
        : friend.invitedAt ?
          <InvitationSent />
          : friend.searchResults == 'no user found'  ?
            <SendInvitation />
            : friend.searchResults == 'user found' ?
              <Connect />
              :
              <PhoneNumberSearch />
      }


      {
        friend.searchResults == 'no user found' ?
            <Button bgcolor="pink" text="Yes lets send an invite" onPress={sendInvite} />
            : friend.searchResults == 'user found' ?
              <Button bgcolor="pink" text="Connect!" onPress={assignFriend} />
              : !friend.searchResults ?
              <Button bgcolor="pink" text="Search" onPress={searchUsers} />
              : null
      }



      <KeyboardSpacer />
    </View>
  );
}

export default Invite;
