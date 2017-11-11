import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { Button, Title } from '../../components/Generic';
import { PhoneInput } from '../../components/Input'
import Unfinished  from '../../components/Card/Unfinished';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


class GetStarted extends Component {

  _getTitleText = () => {
    let text = 'wha?'
    const { showCard, friendName, myInvites, showPhoneInput, unfinished } = this.props

    if(showCard && !unfinished.from ) { text = 'Who told you about chaz?' }
    if(showCard && unfinished.from ) { text = `Did ${unfinished.from.displayName} tell you about chaz?` }
    if(friendName && myInvites && !showPhoneInput) { text = `Is ${friendName} on chaz?`}
    if(showPhoneInput) { text = 'Enter your phone number'}
    if(friendName && myInvites && myInvites.length > 0 ) { text = `Did ${myInvites[0].from.displayName} tell you?`}


    return text
  }

  render() {


    const { myInvites, onYesPress, onAcceptInvitePress, updateState, unfinished, friendName, phoneSearched, onTextChange, showCard, goToRegister, onNextPress, onPhoneNumberYesPress, showPhoneInput, phoneNumber, onSearchForPhonePress } = this.props


    // console.warn(myInvites)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />

      <View style={styles.container}>
        <Title card>{this._getTitleText()}</Title>

        <View style={{backgroundColor:'transparent'}}>
        {showCard && <Unfinished {...this.props} />}
        </View>


        { // Who told you about chaz?
          showCard && !myInvites && friendName != '' &&
          <View>
            <Button bgcolor='green' rounded fat animated text="Next" onPress={onNextPress} />
          </View>
        }

        { // couldnt find invite by name, try searching by your phone?
          myInvites && myInvites.length == 0 && !showPhoneInput &&
          <View>
            <Button bgcolor='green' rounded fat animated text="Yes" onPress={()=>updateState({showPhoneInput: true})} />
            <Button bgcolor='red' rounded fat animated text="No" onPress={()=>alert('add ur phone# do it')} />
          </View>
        }

        { // Search for invites by phone
          showPhoneInput &&
          <View style={{marginTop: -20}}>
            <PhoneInput phoneNumber={phoneNumber} onTextChange={(state) => onTextChange(state) }/>
            <View style={{marginTop: -20}}>
            <Button bgcolor='green' rounded fat animated text="Search" onPress={onSearchForPhonePress} />
            </View>
          </View>
        }



        { // Found an invite with this users phoneNumber on it
          myInvites && myInvites.length > 0 && !showPhoneInput && false &&
          <View>
          <Text>Is this your phone#? {myInvites[0].to.phoneNumber}?</Text>
          <Button bgcolor='green' rounded fat animated text="YES" onPress={()=>goToRegister(myInvites[0].to.phoneNumber)} />
          <Button bgcolor='red' rounded fat animated text="NO" onPress={()=>alert('come on, now.')} />
        </View>

        }

        {
          // Found a invite by display name
          myInvites && myInvites.length > 0 && false &&
          <View>
          <Title card>We found an invite for you</Title>
          <Button bgcolor='green' rounded fat animated text="Awesome, activate and accept invite" onPress={()=>goToRegister(myInvites[0].to.phoneNumber)} />
          <Button bgcolor='red' rounded fat animated text="NO go at it alone" onPress={()=>alert('come on, now.')} />
        </View>

        }

        {
          showCard && unfinished.from && false && 
            <Button bgcolor='green' rounded fat animated text="Yes, accept the invite" onPress={onAcceptInvitePress} />
        }

        {
          showCard &&  myInvites && myInvites.length > 0 &&
            <Button bgcolor='pink' rounded fat animated text="Yep, Accept Invite" onPress={onAcceptInvitePress} />
        }


              {!showCard &&
                <View>
                <Title card>Did someone tell you about chaz?</Title>
              <Button bgcolor='green' rounded fat animated text="YES" onPress={onYesPress} />
              <Button bgcolor='red' rounded fat animated text="NO" onPress={()=>alert('dont lie')} />
              </View>
            }
</View>
        <KeyboardSpacer />

      </View>
    );
}

}

export default GetStarted;
