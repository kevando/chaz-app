import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class Queue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="page_with_curl" title="All Recommendations" >
          <TouchableOpacity onPress={onPress} >
            <View>
              <Text>You saved {recs.length} total recommendations.</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default Queue;
