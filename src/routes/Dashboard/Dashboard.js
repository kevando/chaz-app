import React from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';
import RecCard from '../../components/Card/Rec';
import NotificationPermission from '../../components/Card/NotificationPermission';
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
            <RecCard totalRecs={recommendations.length} rec={rec} key={i} {...props} notificationPermission={app.notificationPermission}  />
          )
        })
      }

      <NotificationPermission />
      </ScrollView>


      <Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
