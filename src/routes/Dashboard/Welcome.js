import React, { Component } from 'react';
import { View, Animated, Text, ScrollView, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

import { colors } from '../../config/styles';
import styles from './styles';
import { Button } from '../../components/Generic';
import { PreviewCard } from '../../components/Card/Rec';

const window = Dimensions.get('window');

const H = window.height
const W = window.width


const WelcomeToChaz = () => {
  return (
    <View style={styles.slide}>
    <StatusBar barStyle="light-content" hidden={false} />
      <Text style={styles.title}>Welcome to chaz</Text>
      <Text style={styles.text}>An app designed to help you build more empathy</Text>
      <Text style={styles.nextText}>Swipe to learn how ></Text>
    </View>
  )
}

const Listen = () => {
  return (
    <View style={styles.slide}>
    <View style={styles.imageContainer}>
    <View style={[{width: 150},styles.iconsContainer]}>
    <Icon name="music" size={60} color={colors.yellow} style={[styles.icon,{top:33,left: 45,}]}/>
    <Icon name="message-square"  size={150} color={'white'} style={[styles.icon,{top: 0,left: 0,}]}/>
    </View>
    </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Listen</Text>
        <Text style={styles.text}>Your friends probably give you great recommendations all the time, but do you always remember?</Text>

      </View>
    </View>

  )
}

const CheckItOut = () => {
  return (
    <View style={styles.slide}>
    <View style={styles.imageContainer}>
    <View style={[{width: 100},styles.iconsContainer]}>
      <Icon name="headphones" size={100} color={colors.yellow} style={[styles.icon,{top: 0,left: 0,}]}/>
      <Icon name="user" size={80} color={colors.white} style={[styles.icon,{top: 100,left: 10,}]}/>
    </View>
    </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Save</Text>
        <Text style={styles.text}>Use chaz to save recommendations from your friends so you can remember later.</Text>
      </View>
    </View>
  )
}
const FollowUp = () => {
  return (
    <View style={styles.slide}>
    <View style={styles.imageContainer}>
    <View style={[{width: 170},styles.iconsContainer]}>
    <AwesomeIcon name="heart" size={50} color={colors.yellow} style={[styles.icon,{top:40,left: 45,}]}/>
    <Icon name="message-square"  size={150} color={'white'} style={[styles.icon,{top: 0,left: 0,transform: [{ scaleX: -1 }] }]}/>
    </View>
    </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Follow Up</Text>
        <Text style={styles.text}>Your friends like to know what you think about their recommendation and chaz helps remind you.</Text>
      </View>
    </View>

  )
}

const GetStarted = ({onNewRecPress}) => {
  return (
    <View style={styles.slideFinal}>
      <Animatable.View style={{flex:1,alignItems: 'center',marginTop: 50}}>

      <Text style={[styles.text,{marginBottom:40,marginTop:100,}]}>Here is what a recommendation from your dad might look</Text>
      <PreviewCard />
      </Animatable.View>
      <View style={{width: W}}>
      <Button text="Add First Recommendation" onPress={onNewRecPress}/>
      </View>
    </View>
  )
}

class Welcome extends Component  {

  constructor(props){
    super(props)
    this.state = { showsPagination: true  }
  }

  render() {

    const swiperProps = {
      // index: 4,
      style: styles.wrapper,
      // dot: (<View style={{backgroundColor:'rgba(255,255,255,.25)', width: 20, height: 20,borderRadius: 25, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 50,}} />),
      // activeDot: (<View style={{backgroundColor: 'rgba(255,255,255,.6)', width: 25, height: 25, borderRadius: 25, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 50,}} />),
      dotColor: 'rgba(255,255,255,.25)',
      activeDotColor: 'rgba(255,255,255,.6)',
      showsPagination: this.state.showsPagination,
      loop: false,
      onIndexChanged: (index) => {this.setState({showsPagination: index !== 4}) }
    }

    return (
      <Swiper {...swiperProps} showsButtons={true}>
        <WelcomeToChaz />
        <Listen />
        <CheckItOut />
        <FollowUp />
        <GetStarted onNewRecPress={this.props.onNewRecPress} />
      </Swiper>
    )
  }



}

export default Welcome;
