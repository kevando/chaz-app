import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import _ from 'lodash'
import styles from './styles';
import { FriendHeader, UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Label, Button } from '../../components/Generic/';

const FriendView = ({ friend, app, myRecs, givenRecs, onKeyPress, user, validPhoneNumber, sendInvite, onGiveRecPress }) => {



  return (
    <View style={styles.container}>
      <ScrollView>

      <FriendHeader friend={friend} />

      {
        _.map(myRecs,rec => <RecCard rec={rec} key={rec.id} />)
      }

      {
        !user.displayName ? // User is anon
          <Text>You should think about creating an account</Text>
        :
        !friend.ui ? // ok lets offer the option to invite this user
          <FindUserCard friend={friend} onKeyPress={onKeyPress} validPhoneNumber={validPhoneNumber} sendInvite={sendInvite} />
        : // offer the option to send this friend a rec
        <Button text="Give a Recommendation" onPress={onGiveRecPress} />
      }




      </ScrollView>
      { friend.uid && <Button text="Give a Recommendation" onPress={onGiveRecPress} /> }
    </View>
  );
}

export default FriendView;
