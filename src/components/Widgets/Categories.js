import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import styles from './styles';


// import { bindActionCreators } from 'redux'
// import * as recActions from '../../reducers/rec/actions';



class Categories extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    const {onPress} = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>

          <Text>You have  uncategorys recs</Text>

      </View>
      </TouchableOpacity>
    );
  }
}


export default Categories;
