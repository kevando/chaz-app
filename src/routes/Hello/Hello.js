import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button } from '../../components/Generic';
import { RecListItem } from '../../components/Card/Rec';
import Filter from '../../components/Nav/Filter';
import NotificationPermission from '../../components/Card/NotificationPermission';
// import * as Onboarding from '../../components/Onboarding'
import styles from './styles';
import firebase from 'react-native-firebase'

const Hello = (props) => {

  // Name Input


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />



      <Text>hello</Text>

    </View>
  );
}
export default Hello
