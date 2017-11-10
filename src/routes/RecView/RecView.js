import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
// import { SetReminderButton  } from '../../components/SetReminder'
import EnableNotifications from '../../components/EnableNotifications'

import { CardDetail } from '../../components/Rec'
import styles from './styles';
import { Button } from '../../components/Generic'
//

const RecView = ({ rec, user, acceptInvitation, reco, app, isEditing, updateRec, updateState, saveRec, onDeletePress, updateRecommendation,onAssignPress, setRecReminder }) => {

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>


    {
      isEditing &&
        <Text style={{color: 'white',marginLeft: 10}} onPress={()=>updateState({isEditing: false})}>Cancel</Text>
    }

    {
      isEditing ?
        <CardDetail isEditing rec={rec} updateRec={updateRec} updateState={updateState} saveRec={saveRec} /> :
        <CardDetail user={user} acceptInvitation={acceptInvitation} setRecReminder={setRecReminder} updateState={updateState} rec={rec} onDelete={onDeletePress} updateRecommendation={updateRecommendation} app={app} />
    }


      {
        app.notificationPermission != 'authorized' &&
          <EnableNotifications button />
      }





    </ScrollView>
    { isEditing &&
      <Button text="Save" onPress={saveRec} />
    }
    <KeyboardSpacer />
    </View>
  );

}

export default RecView;
