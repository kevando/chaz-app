import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import Card from '../../components/Card';
import AppSettings from '../../components/AppSettings';
import styles from './styles';

const Dashboard = (props) => {

  const { activeFilter, recommendations, setStatus, onNewRecPress, app, setReminder, deleteRecommendation, setNotificationPermission } = props;


  var filteredRecs;

  if(activeFilter == 'all'){
    filteredRecs = recommendations;
  } else if(activeFilter == 'queue') {
    filteredRecs = _.filter(recommendations,(rec) => { return rec.status == 'new'})
  } else if (activeFilter == 'finished') {
    filteredRecs = _.filter(recommendations,(rec) => { return rec.status == 'watched'})
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollView}>
      {
        _.map(filteredRecs,function(rec,i) {
          return(
            <Card rec={rec} key={i} setReminder={setReminder} deleteRecommendation={deleteRecommendation} notificationPermission={app.notificationPermission} setStatus={setStatus}/>
          )
        })
      }


      </ScrollView>
      <AppSettings {...props} />
      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}

export default Dashboard;
