import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import Card from '../../components/Card';
import AppSettings from '../../components/AppSettings';
import styles from './styles';

const Dashboard = (props) => {

  const { activeFilter, recommendations, onNewRecPress, app, setNotificationPermission } = props;


  var filteredRecs;

  if(activeFilter == 'all'){
    filteredRecs = recommendations;
  } else if(activeFilter == 'queue') {
    filteredRecs = _.filter(recommendations,(rec) => { return rec.status == 'new'})
  } else if (activeFilter == 'finished') {
    filteredRecs = _.filter(recommendations,(rec) => { return rec.status == 'finished'})
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollView}>
      {
        _.map(filteredRecs,function(rec,i) {
          return(
            <Card rec={rec} key={i} {...props} notificationPermission={app.notificationPermission}  />
          )
        })
      }


      </ScrollView>

      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
