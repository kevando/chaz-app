import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button } from '../../components/Generic';
import { Card } from '../../components/Card/Rec';
import Filter from '../../components/Nav/Filter';
import NotificationPermission from '../../components/Card/NotificationPermission';
import * as Onboarding from '../../components/Onboarding'
import styles from './styles';
import firebase from 'react-native-firebase'

const Dashboard = (props) => {
  // console.log(props)
  const { myRecs, onNewRecPress, onNewGivenRecPress, activeFilter, changeActiveFilter, givenRecs } = props;


  const filteredRecs = activeFilter === 'Everything' ? myRecs : _.filter(myRecs, function(rec) { return rec.category.title == activeFilter; });


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

        <ScrollView style={styles.scrollView}>

          <View style={styles.titleContainer}>
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
          </View>

        {myRecs.length > 6 && <Filter activeFilter={activeFilter} changeActiveFilter={changeActiveFilter} />}


      {
        _.map(filteredRecs,function(rec,i) {
          return(
            <Card rec={rec} key={i} />
          )
        })
      }

      <Text>{props.user.isAnonymous ? 'anon' : 'not anon'}</Text>
      <Onboarding.NotificationPermission />

      </ScrollView>


      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
