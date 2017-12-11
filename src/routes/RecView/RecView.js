import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import moment from 'moment'
import * as Animatable from 'react-native-animatable'
// import { SetReminderButton  } from '../../components/SetReminder'
import EnableNotifications from '../../components/EnableNotifications'

import { CardDetail } from '../../components/Rec'
import styles from './styles';
import { Button, Title } from '../../components/Generic'
//

const RecView = ({ rec, user, acceptInvitation, app, isEditing, updateRec, setGrade, updateState, saveRec, onDeletePress ,onAssignPress, setRecReminder }) => {
  // console.warn(user.uid)
  return (
    <View style={{flex:1}}>
    <View style={styles.container}>
    <Title />

    {
      isEditing &&
        <Text style={{color: 'white',marginLeft: 10}} onPress={()=>updateState({isEditing: false})}>Cancel</Text>
    }



    {
      isEditing ?
        <CardDetail isEditing rec={rec} updateRec={updateRec} updateState={updateState} saveRec={saveRec}  /> :
        <CardDetail user={user} setGrade={setGrade} acceptInvitation={acceptInvitation} setRecReminder={setRecReminder} updateState={updateState} rec={rec} onDelete={onDeletePress} updateRec={updateRec} app={app} />
    }


    {
      app.notificationPermission != 'authorized' &&
        <EnableNotifications button />
    }

    </View>
    { isEditing &&
      <Button text="Save" onPress={saveRec} />
    }
    <KeyboardSpacer />
    </View>
  );

}

export default RecView;
