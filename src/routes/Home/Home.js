import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { Categories, MovieQueue } from '../../components/Widgets'

const Home = (props) => {

  const { onCategoryPress, onMovieQueuePress } = props;

  return (
    <View style={styles.container}>
      <Categories onPress={onCategoryPress} />
      <MovieQueue onPress={onMovieQueuePress} />
    </View>


  );
};

Home.propTypes = {
  onAddRecPress: React.PropTypes.func,
};

export default Home;
