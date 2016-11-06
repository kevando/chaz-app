import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class Welcome extends Component {

  render() {
    const { recs} = this.props.data;

    if(recs.length == 0){
      return (
        <WidgetContainer icon="wave" title="Welcome to chaz" >

            <View style={styles.widgetButton}>

              <Text style={styles.text}>Thank you for participating in the beta test.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}>When someone gives you a good recommendation, use this app to save it for later.</Text>
            </View>

        </WidgetContainer>
      );
    } else {
      return <View />
    }
  }

}

export default Welcome;
