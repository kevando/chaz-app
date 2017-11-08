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
      <Friend.Header friend={friend} />
      <ScrollView style={styles.scrollContainer}>





      {
        _.map(myRecs,(rec,i) => {return (
          <Card skinny key={i} rec={rec} />
        )})
      }

      {
        _.map(givenRecs,(rec,i) => {return (
          <Card given skinny key={i} rec={rec} />
        )})
      }

        {!friend.uid && friend.invitedAt &&
          <View style={{marginHorizontal: 20}}>
          <Label center>Any minute...</Label>

          </View>
        }





      </ScrollView>
      { friend.uid && <Button text="Send a Recommendation" onPress={onGiveRecPress} /> }
      { !friend.uid && !app.isAnon && !friend.invitedAt &&<Button bgcolor="pink" text={`Recommend chaz to ${friend.name}`} onPress={()=>Actions.push('InviteModal',{friend})} /> }
      { !friend.uid && !app.isAnon && friend.invitedAt && <Button bgcolor="pink" text="Invited" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
