import React from 'react';
import { View, Text} from 'react-native';


const Dashboard = (props) => {


  // This should be a pure function with all acitivty happening in container

  const { username } = props;

  return (
    <View style={styles.container}>
      <Text>dude im da dashboard</Text>
      <Text>username: {username}</Text>
    </View>
  );



}

export default Dashboard;
