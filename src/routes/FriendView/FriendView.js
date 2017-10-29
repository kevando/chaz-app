import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { NameCard, UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Label, Button } from '../../components/Generic/';

const FriendView = ({ friend, app, myRecs, givenRecs, onKeyPress, user, validPhoneNumber, sendInvite, onGiveRecPress }) => {



  return (
    <View style={styles.container}>
      <ScrollView>

      <NameCard friend={friend} />

      {
        !friend.uid && !user.isAnonymous && !friend.phoneNumber &&
        <FindUserCard friend={friend} onKeyPress={onKeyPress} validPhoneNumber={validPhoneNumber} sendInvite={sendInvite} />
      }

      {
        !friend.uid && friend.phoneNumber &&
        <Label center>You sent an invite to this user</Label>
      }

      <Text style={styles.label}>Recommendations from this user</Text>
      {
        _.map(myRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

      {givenRecs.length > 0 && <Text style={styles.label}>Recommendations I made to this user</Text>}
      {
        _.map(givenRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

      </ScrollView>
      { friend.uid && <Button text="Give a Recommendation" onPress={onGiveRecPress} /> }
    </View>
  );
}

export default FriendView;
