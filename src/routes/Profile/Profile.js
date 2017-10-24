import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
// import _ from 'lodash';

// import Button from '../../components/Button';

import styles from './styles';

const Profile = (props) => {
  console.log(props)
  const { onLogoutPress, user } = props;

  return (
    <View style={styles.container}>

      <Text>profile</Text>
      <Text>email: {user.email}</Text>


        <Button color="red" style={styles.button} title="Sign Out" onPress={onLogoutPress} />


    </View>
  );
}

export default Profile;
