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


        {!friend.uid && !friend.invitedAt &&
          <View style={{marginHorizontal: 20}}>
          <Label center>Want to tell {friend.name} about chaz?</Label>

          </View>
        }

        {!friend.uid && friend.invitedAt &&
          <View style={{marginHorizontal: 20}}>
          <Label center>Any minute...</Label>

          </View>
        }





      </ScrollView>
      { friend.uid && <Button text="Send a Recommendation" onPress={onGiveRecPress} /> }
      { !friend.uid && !app.isAnon && !friend.invitedAt &&<Button bgcolor="pink" text="Invite" onPress={()=>Actions.push('InviteModal',{friend})} /> }
      { !friend.uid && !app.isAnon && friend.invitedAt && <Button bgcolor="pink" text="Invited" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
