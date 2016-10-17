import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import Emoji from 'react-native-emoji';

class Welcome extends Component {

  render() {
    const { recs} = this.props.data;

    if(recs.length == 0){
      return (
        <WidgetContainer icon="wave" title="Welcome" >

            <View style={styles.widgetButton}>
              <Text>Hello, and welcome to chaz</Text>
              <Text>The app is arranged using 'widgets.' These will grow and expand as you use the app.</Text>
              <Text>Get started by adding a new recommendation by hitting the blue button.</Text>
            </View>

        </WidgetContainer>
      );
    } else {
      return <View />
    }
  }



}

export default Welcome;
