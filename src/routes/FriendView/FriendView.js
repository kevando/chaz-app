import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { NameCard, UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Label, Button } from '../../components/Generic/';

const FriendView = ({ friend, myRecs, givenRecs, onKeyPress, user, onAssignUserPress, onGiveRecPress }) => {



  return (
    <View style={styles.container}>
      <ScrollView>

      <NameCard friend={friend} />

      {
        !friend.uid &&
        <FindUserCard friend={friend} onKeyPress={onKeyPress} user={user} onAssignUserPress={onAssignUserPress} />
      }

      <Text style={styles.label}>Recommendations from this user</Text>
      {
        _.map(myRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

      <Text style={styles.label}>Recommendations I made to this user</Text>
      {
        _.map(givenRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

      </ScrollView>
      { friend.uid && <Button text="Give a Recommendation" onPress={onGiveRecPress} /> }
    </View>
  );
}

export default FriendView;
