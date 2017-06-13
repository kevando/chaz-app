import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

import images from '../../config/images';


class Heartman extends Component {

  render() {
    alert('heartman')

    const { text='Hi I am heartman', delay=1000 } = this.props;

    return (
      <View>
        <Animatable.Text
          delay={delay+200}
          duration={1800}
          animation="bounceInUp"
        >
          {text}
        </Animatable.Text>
        <Animatable.Image
          source={images.heartman}
          delay={delay}
          duration={1800}
          animation="bounceInLeft"
        />
      </View>
    );
  }
}

export default Heartman;
