import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class Queue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="page_with_curl" title="All Recs" onPress={onPress}>
          <View>
            <Text>You have {recs.length} total recs</Text>
          </View>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default Queue;
