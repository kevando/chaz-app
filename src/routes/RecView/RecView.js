import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SetReminderButton, EnableNotificationsButton  } from '../../components/SetReminder'
import { CardDetails } from '../../components/Card/Rec'
import styles from './styles';
//

const RecView = ({ rec, app, onEditPress, onDeletePress, updateRecommendation,onAssignPress }) => {

  return (
    <ScrollView style={styles.container}>

      <CardDetails rec={rec} />
      {
        app.notificationPermission == 'authorized' ?

        <SetReminderButton rec={rec} updateRecommendation={updateRecommendation} app={app}/>

        :

        <EnableNotificationsButton rec={rec} updateRecommendation={updateRecommendation} app={app}/>
      }

    </ScrollView>
  );

  // return (
  //   <ScrollView style={styles.container}>
  //
  //     <Text style={styles.label}>Recommendation</Text>
  //     <TitleCard rec={rec} onEditPress={onEditPress}/>
  //
  //     <Category rec={rec} onCategoryPress={onCategoryPress} />
  //
  //     <Text style={styles.label}>Recommended by</Text>
  //     <FriendCard friend={rec.friend} />
  //
  //     <Text style={styles.label}>Follow Up</Text>
  //     <ReminderCard rec={rec} updateRecommendation={updateRecommendation} app={app}/>
  //
  //     <View style={{marginTop:200}}>
  //       <Button title="delete" onPress={onDeletePress} color="red" />
  //     </View>
  //
  //   </ScrollView>
  // );
}

export default RecView;
