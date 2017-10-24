import React from 'react';
import { View, Text, ScrollView, StatusBar, Button, TextInput } from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { NameCard, UserCard, FindUserCard } from '../../components/Card/FriendView'

const FriendView = ({ friend, onKeyPress, user, onAssignUserPress }) => {



  return (
    <View style={styles.container}>

      <NameCard friend={friend} />

      {
        friend.uid ?
        <UserCard friend={friend} /> :
        <FindUserCard friend={friend} onKeyPress={onKeyPress} user={user} onAssignUserPress={onAssignUserPress} />
      }

    </View>
  );
}

export default FriendView;
