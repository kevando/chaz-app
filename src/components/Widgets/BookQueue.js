import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class BookQueue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="book" title="Books">
          <TouchableOpacity onPress={onPress} >
            <View>
              <Text>You have {recs.length} book recs</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default BookQueue;
