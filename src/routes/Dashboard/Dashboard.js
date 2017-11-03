import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button } from '../../components/Generic';
import { Card } from '../../components/Rec'
import Filter from '../../components/Nav/Filter';

import { OnboardingCard } from '../../components/Card/Onboarding'
import styles from './styles';
import firebase from 'react-native-firebase'

const Dashboard = (props) => {
  // console.log('Dashboard.js', props)
  const { myRecs, onNewRecPress, onNewGivenRecPress, activeFilter, changeActiveFilter, givenRecs } = props;


  const filteredRecs = myRecs// TMP UI!! activeFilter === 'Everything' ? myRecs : _.filter(myRecs, function(rec) { return rec.category.title == activeFilter; });


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
            <Card rec={rec} key={i} listItem />
          )
        })
      }

      <OnboardingCard />

      </ScrollView>


      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
