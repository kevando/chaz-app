import React from 'react';
import { View, Text, ScrollView, StatusBar, Button, TextInput } from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { NameCard, UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'

const FriendView = ({ friend, friendRecs, onKeyPress, user, onAssignUserPress }) => {



  return (
    <View style={styles.container}>

      <NameCard friend={friend} />

      {
        friend.uid ?
        <UserCard friend={friend} /> :
        <FindUserCard friend={friend} onKeyPress={onKeyPress} user={user} onAssignUserPress={onAssignUserPress} />
      }

      <Text style={styles.label}>recommendations</Text>
      {
        _.map(friendRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

    </View>
  );
}

export default FriendView;
