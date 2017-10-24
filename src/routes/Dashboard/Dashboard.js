import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import RecCard from '../../components/Card/Rec';
import Filter from '../../components/Nav/Filter';
import NotificationPermission from '../../components/Card/NotificationPermission';
import * as Onboarding from '../../components/Onboarding'
import styles from './styles';

const Dashboard = (props) => {
  // console.log(props)
  const { myRecs, onNewRecPress, onNewGivenRecPress, activeFilter, changeActiveFilter, givenRecs } = props;


  const filteredRecs = activeFilter === 'Everything' ? myRecs : _.filter(myRecs, function(rec) { return rec.category.title == activeFilter; });


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <ScrollView style={styles.scrollView}>
      {myRecs.length > 6 && <Filter activeFilter={activeFilter} changeActiveFilter={changeActiveFilter} />}

      {
        _.map(filteredRecs,function(rec,i) {
          return(
            <RecCard rec={rec} key={i} />
          )
        })
      }


      <Onboarding.NotificationPermission />


      </ScrollView>


      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
