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
        <Text style={{color: 'white', fontSize: 20,marginBottom: 10}} >Recs I gave to this person</Text>
      {
        _.map(myRecs,rec => <Card skinny rec={rec} key={rec.id} />)
      }
      </View>

      {
        app.isAnon && // User is anon
          <Text>You should think about creating an account</Text>
        }
        {
          friend.uid && // ok lets offer the option to invite this user

         // offer the option to send this friend a rec
        <Button text="Give a Recommendation" onPress={()=>Actions.push('InviteModal',{friend})} />
      }


      </ScrollView>
      { friend.uid && <Button text="Give a Recommendation" onPress={onGiveRecPress} /> }
      { !friend.uid && !app.isAnon && <Button bgcolor="pink" text="Invite" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
