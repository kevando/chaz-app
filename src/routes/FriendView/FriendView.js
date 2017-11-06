import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import styles from './styles';
import { UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Card } from '../../components/Rec'
import * as Friend from '../../components/Friend'
import { Label, Button } from '../../components/Generic/';

const FriendView = ({ friend, app, myRecs, givenRecs, user, onGiveRecPress }) => {



  return (
    <View style={styles.container}>
      <ScrollView>

      <Friend.Header friend={friend} />

      <View style={{marginHorizontal: 20}}>
        <Text style={{color: 'white', fontSize: 20,marginBottom: 10}} >Things {friend.name} told me about</Text>
      {
        _.map(myRecs,rec => <Card skinny rec={rec} key={rec.id} />)
      }
      </View>

      <View style={{marginHorizontal: 20}}>
        <Text style={{color: 'white', fontSize: 20,marginBottom: 10}} >Things I told {friend.name} about</Text>
      {
        _.map(givenRecs,rec => <Card skinny rec={rec} key={rec.id} />)
      }
      </View>



      </ScrollView>
      { friend.uid && <Button text="Send a Recommendation" onPress={onGiveRecPress} /> }
      { !friend.uid && !app.isAnon && !friend.invitedAt &&<Button bgcolor="pink" text="Invite" onPress={()=>Actions.push('InviteModal',{friend})} /> }
      { !friend.uid && !app.isAnon && friend.invitedAt && <Button bgcolor="pink" text="Invited" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
