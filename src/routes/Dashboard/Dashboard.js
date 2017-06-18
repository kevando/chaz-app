import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import Card from '../../components/Card';
import AppSettings from '../../components/AppSettings';
import styles from './styles';

const Dashboard = (props) => {

  const { recommendations, onNewRecPress, app, setNotificationPermission } = props;


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={false} />

      <ScrollView style={styles.scrollView}>
      {
        _.map(recommendations,function(rec,i) {
          return(
            <Card totalRecs={recommendations.length} rec={rec} key={i} {...props} notificationPermission={app.notificationPermission}  />
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
