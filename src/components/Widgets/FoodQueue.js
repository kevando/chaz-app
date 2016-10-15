import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class FoodQueue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="ramen" title="Food" >
          <TouchableOpacity onPress={onPress} >
            <View>
              <Text>You have {recs.length} food recs</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default FoodQueue;
