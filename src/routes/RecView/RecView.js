import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { SetReminderButton  } from '../../components/SetReminder'
import EnableNotifications from '../../components/EnableNotifications'
import { CardDetails, CardDetailsEditing } from '../../components/Card/Rec'
import { CardDetail } from '../../components/Rec'
import styles from './styles';
import { Button } from '../../components/Generic'
//

const RecView = ({ rec, app, isEditing, updateRec, updateState, saveRec, onDeletePress, updateRecommendation,onAssignPress }) => {
  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>


    {
      isEditing ?
        <Text onPress={()=>updateState({isEditing: false})}>Cancel</Text> :
        <Text onPress={()=>updateState({isEditing: !isEditing})}>Toggle edit</Text>
    }

    {
      isEditing ?
        <CardDetail isEditing rec={rec} updateRec={updateRec} updateState={updateState} saveRec={saveRec} /> :
        <CardDetail rec={rec} />
    }


      {
        app.notificationPermission == 'authorized' ?
          <SetReminderButton rec={rec} updateRecommendation={updateRecommendation} app={app}/> :
          <EnableNotifications button />
      }





    </ScrollView>
    { isEditing &&
      <Button text="Save" onPress={saveRec} />
    }
    <KeyboardSpacer />
    </View>
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
