import React from 'react';
import { Text, View, Image } from 'react-native';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import images from '../../config/images';
import { capitalize } from '../../lib/string';
import styles from './styles';

const Profile = (props) => {
  const { user, signOut } = props;
  let email;

  if (user) {
    username = user.username;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.header} source={images.profileHeader} />
      <View style={styles.body}>
        <Avatar email={username} />
        <Text>{capitalize(username)}</Text>
        <Button text="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
};

Profile.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func,
};

export default Profile;
