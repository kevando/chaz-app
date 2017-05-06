import React from 'react';
import { View, ScrollView } from 'react-native';
import _ from 'lodash';
import { ListItem, Text, Icon } from 'native-base';

import Button from '../../components/Button';
import Card from '../../components/Card';
import EnableReminders from '../../components/EnableReminders';
import styles from './styles';

const Dashboard = (props) => {

  const { recommendations, setStatus, onNewRecPress, app, setReminder, deleteRecommendation, setNotificationPermission } = props;

  return (
    <View style={styles.container}>
      <ScrollView>
      {
        _.map(recommendations,function(rec,i) {
          return(
            <Card rec={rec} key={i} setReminder={setReminder} deleteRecommendation={deleteRecommendation} notificationPermission={app.notificationPermission} setStatus={setStatus}/>
          )
        })
      }

      </ScrollView>
      <EnableReminders app={app} setNotificationPermission={setNotificationPermission} />
      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}

export default Dashboard;
