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
    const { showCard } = this.props
    text = !showCard && 'Did someone tell you about chaz?'
    text =  showCard  && 'Who told you about chaz?'

    return text
  }

  render() {
      console.log(this.props)

    const { myInvites, onYesPress, updateState, unfinished, friendName, phoneSearched, showCard, goToRegister, onNextPress, onPhoneNumberYesPress, showPhoneInput, phoneNumber, onSearchForPhonePress } = this.props
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={true} />

      <View style={styles.container}>
        <Title card>{this._getTitleText()}</Title>

        <View>
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
            <Title>Is {friendName} on chaz?</Title>
            <Button bgcolor='green' rounded fat animated text="Yes" onPress={()=>updateState({showPhoneInput: true})} />
            <Button bgcolor='red' rounded fat animated text="No" onPress={()=>alert('add ur phone# do it')} />
          </View>
        }

        { // Search for invites by phone
          showPhoneInput &&
          <View>
            <Title>Add your phone number</Title>
            <PhoneInput phoneNumber={phoneNumber} onTextChange={(phoneNumber) => updateState({phoneNumber}) }/>
            <Button bgcolor='green' rounded fat animated text="Search" onPress={onSearchForPhonePress} />
          </View>
        }



        { // Found an invite with this users phoneNumber on it
          myInvites && myInvites.length > 0 && !showPhoneInput &&
          <View>
          <Text>Is this your phone#? {myInvites[0].to.phoneNumber}?</Text>
          <Button bgcolor='green' rounded fat animated text="YES" onPress={()=>goToRegister(myInvites[0].to.phoneNumber)} />
          <Button bgcolor='red' rounded fat animated text="NO" onPress={()=>alert('come on, now.')} />
        </View>

        }

        {
          // Found a invite by nam e
          myInvites && myInvites.length > 0 && showPhoneInput && 
          <View>
          <Title card>We found an invite for you</Title>
          <Button bgcolor='green' rounded fat animated text="Awesome, activate and accept invite" onPress={()=>goToRegister(myInvites[0].to.phoneNumber)} />
          <Button bgcolor='red' rounded fat animated text="NO go at it alone" onPress={()=>alert('come on, now.')} />
        </View>

        }


              {!showCard &&
                <View>
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
