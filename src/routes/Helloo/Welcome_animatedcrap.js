import React, { Component } from 'react';
import { View, Animated, Text, ScrollView, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { colors } from '../../config/styles';
import styles from './styles';
import { Button } from '../../components/Generic';

const window = Dimensions.get('window');

const H = window.height

const WelcomeBlue = () => {
  return (
    <Animatable.View style={[styles.blueView,{}]} >
      <Text style={[styles.title,{marginBottom:100}]}>Welcome to chaz</Text>
      <Text style={styles.text}>Tap anything blue</Text>
    </Animatable.View>
  )
}

// ----------------------------------------------

const WhatBlue = () => {
  return (
    <View style={[styles.blueView,{}]}>
      <Text style={[styles.text,{marginTop: 100}]}>an app that helps you build empathy </Text>
    </View>
  )
}

const WhatPurple = () => {
  return (
    <View style={[styles.purpleView,{}]}>
      <Text style={[styles.title,{marginTop: 20,}]}>What is chaz??</Text>
    </View>
  )
}


// ----------------------------------------------

const HowBlue = () => {
  return (
    <View style={[styles.blueView,{}]}>
      <Text style={[styles.text,{marginTop: 100}]}>Lets pretend your friend tells you about her favorite new band</Text>
    </View>
  )
}

const HowPurple = () => {
  return (
    <View style={[styles.purpleView,{}]}>

    </View>
  )
}
class Welcome extends Component  {

  screenStages = [
    {height: H, bottom: <WelcomeBlue /> },
    {height: H-100, bottom: <WhatBlue />, top: <WhatPurple /> },
    {height: H-200, bottom: <HowBlue />, top: <HowPurple /> },
  ]

  constructor(props){
    super(props)
    this.state = { showHow: false, currentStage: 1 }
    this.onProceedPress = this.onProceedPress.bind(this)
    this.onBackPress = this.onBackPress.bind(this)
    this.transitionScenes = this.transitionScenes.bind(this)
  }


  componentDidMount() {
  // this.transitionScenes(1) // testing
  }

  transitionScenes(newIndex) {

    const fadeOutDuration = 400
    const transitionDuration = 500
    const transitionDelay = 0
    const fadeInDuration = 200
    const fadeOutDelay = fadeOutDuration + transitionDelay + transitionDelay + 200

    // this.refs.top.fadeOut(fadeOutDuration)
    this.refs.bottom.fadeOut(fadeOutDuration)

    setTimeout(() => {
      this.refs.box.transitionTo({height: this.screenStages[newIndex].height},transitionDuration, 'ease-out-cubic')
    },transitionDelay)

    setTimeout(() => {
      this.setState({currentStage: newIndex})
      // this.refs.top.fadeIn(fadeInDuration)
      this.refs.bottom.fadeIn(fadeInDuration)
    },fadeOutDelay)


  }

  onProceedPress() {
    const newIndex = this.state.currentStage + 1
    if(newIndex > this.screenStages.length-1) {
      alert('hold up buddy')
    } else {
      this.transitionScenes(newIndex)
    }


  }

  onBackPress() {
    const newIndex = this.state.currentStage - 1
    if(newIndex < 0) {
      alert('hold up buddy')
    } else {
      this.transitionScenes(newIndex)
    }
    // this.setState({currentStage: --this.state.currentStage})

  }

  render_complex() {

    return (
      <View style={styles.welcomeContainer}>
        <Text onPress={this.onBackPress} style={styles.backButton}>Back</Text>

        <Animatable.View ref="top"  style={styles.topView}>
          {true && this.screenStages[this.state.currentStage].top}
        </Animatable.View>

      <Animatable.View ref="box" style={[styles.blueContainer,{height: this.screenStages[this.state.currentStage].height }]}>
        <TouchableOpacity onPress={this.onProceedPress} style={styles.touchableBlue} activeOpacity={1.0}>

          <Animatable.View ref="bottom" easing="ease-out-cubic">
          {this.screenStages[this.state.currentStage].bottom}
          </Animatable.View>

        </TouchableOpacity>
      </Animatable.View>


      </View>


    )
  }
  demoFinal() {
    this.refs.box.transitionTo({height: this.screenStages[newIndex].height},transitionDuration, 'ease-out-cubic')
  }
  render() {

    return (
      <View style={{flex: 1,justifyContent: 'flex-end',backgroundColor: colors.purple,}}>

        <TouchableOpacity onPress={this.demoFinal.bind(this)} style={styles.touchableBlue} activeOpacity={1.0}>

          <Animatable.View ref="button" style={{height: 50,backgroundColor: colors.blue}}/>



        </TouchableOpacity>



      </View>


    )
  }

  render_og() {

    let WelcomeContent = (
              <ScrollView >
              <Animatable.View
                delay={10}
                duration={500}
                animation="fadeInUp"
              >
              <Text style={styles.title}><AwesomeIcon name="heart" size={50} color={colors.yellow} />chaz</Text>
              <Text style={styles.paragraph}>Friends always recommend stuff like movies and books, but we don’t always remember to follow up.</Text>
              <Text style={styles.paragraph}>Next time someone says: “you gotta check this out!” Open chaz!</Text>
              <Text onPress={() => this.setState({showHow:true})} style={styles.howButton}>How it works</Text>
              </Animatable.View>
              </ScrollView>
    )

    let howContent = (

      <View style={styles.welcomeContainer}>
        <StatusBar hidden={true} />

        <View style={styles.stepsContainer}>

        <View style={styles.step} >
          <Text style={styles.stepText}>Receive Recommendation</Text>
          <View style={[{width: 70},styles.iconsContainer]}>
            <Icon name="music" size={15} color={colors.yellow} style={[styles.icon,{top: 8,left: 40,}]}/>
            <Icon name="message-square" size={35} color={'white'} style={[styles.icon,{top: 0,left: 30,}]}/>
            <Icon name="user" size={30} color={colors.black} style={[styles.icon,{top: 28,left: 0,}]}/>
          </View>
        </View>
        <View style={styles.step} >
          <Text style={styles.stepText}>Save it in chaz</Text>
          <View style={[{width: 70},styles.iconsContainer]}>
            <Icon name="music" size={25} color={colors.yellow} style={[styles.icon,{top: 0,left: 40,}]}/>
            <Icon name="file-text" size={35} color={'white'} style={[styles.icon,{top: 10,left: 0,}]}/>
            <Icon name="user" size={25} color={colors.black} style={[styles.icon,{top: 30,left: 40,}]}/>
          </View>
        </View>
        <View style={styles.step} >
          <Text style={styles.stepText}>Check it out</Text>
          <View style={[{width: 40},styles.iconsContainer]}>
            <Icon name="headphones" size={30} color={colors.yellow} style={[styles.icon,{top: 0,right: 4,}]}/>
            <Icon name="user" size={30} color={colors.white} style={[styles.icon,{top: 30,right: 4,}]}/>
          </View>
        </View>
        <View style={styles.step} >
          <Text style={styles.stepText}>Follow Up</Text>
          <View style={[{width: 70},styles.iconsContainer]}>
            <AwesomeIcon name="heart" size={11} color={colors.yellow} style={[styles.icon,{top: 10,left: 42,}]}/>
            <Icon name="message-square" size={35} color={'white'} style={[styles.icon,{top: 0,left: 30,}]}/>
            <Icon name="user" size={30} color={colors.white} style={[styles.icon,{top: 28,left: 0,}]}/>
          </View>
        </View>
        </View>

      </View>
    )


    return (
      <View style={styles.welcomeContainer}>
        <StatusBar hidden={true} />

          {this.state.showHow ? howContent : WelcomeContent}
          <Button text="Add 1st Recommendation" onPress={this.props.onNewRecPress} />
      </View>
    );

  }

}
// <AppSettings {...props} />
export default Welcome;
