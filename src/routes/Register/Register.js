import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';

import Button from '../../components/Button';

import styles from './styles';

const Register = (props) => {
  // console.log(props)
  const { onRegisterPress, onLoginPress,onLogoutPress,onGivePress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.button} onPress={()=>onRegisterPress('pat@gmail.com','pat')}>Hardcoded register pat</Text>
      <Text style={styles.button} onPress={()=>onLoginPress('pat@gmail.com')}>Hardcoded login pat</Text>
      <Text style={styles.button} onPress={()=>onRegisterPress('khabich@gmail.com','kevin')}>Hardcoded register khab</Text>
      <Text style={styles.button} onPress={()=>onLoginPress('khabich@gmail.com')}>Hardcoded login khab</Text>
      <Text style={styles.button} onPress={onLogoutPress}>Hardcoded logout</Text>
      <Text style={styles.button} onPress={()=>onGivePress('khabich@gmail.com')}>Give Rec</Text>

    </View>
  );
}

export default Register;
