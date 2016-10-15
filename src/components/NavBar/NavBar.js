import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Routes from '../../config/routes';

const NavBar = (props) => {
  const { title, navigator } = props;
  return (
    <TouchableOpacity onPress={() => navigator.push(Routes.getProfileRoute())} >
      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

NavBar.propTypes = {
  text: React.PropTypes.string,
};

export default NavBar;
