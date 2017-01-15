import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

import images from '../../config/images';

class Heartman extends Component {

  render() {

    const { text='Hi I am heartman' } = this.props;

    return (
      <View>
        <Animatable.Text
          delay={100}
          duration={1800}
          animation="bounceInUp"
        >
          {text}
        </Animatable.Text>
        <Animatable.Image
          source={images.heartman}
          delay={100}
          duration={1800}
          animation="bounceInLeft"
        />
      </View>
    );
  }
}

export default Heartman;
