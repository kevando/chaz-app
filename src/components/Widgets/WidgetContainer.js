import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles';
import Emoji from 'react-native-emoji';


import * as Animatable from 'react-native-animatable';


class WidgetContainer extends React.Component {

  componentDidMount() {

    const { icon, title, children } = this.props

    // this.refs[title].bounceInDown();

  }

  render() {

    const { icon, title, children } = this.props


    return (

      <Animatable.View ref={title} animation="bounceIn" delay={100}>
      <View style={styles.container}>

          <View style={styles.titleContainer}>
            <View style={styles.titleLeft}>
              <Text style={styles.icon}><Emoji name={icon} /></Text>
            </View>
            <View style={styles.titleRight}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {children}
          </View>

      </View>

      </Animatable.View>

    );
  }
};


export default WidgetContainer;
