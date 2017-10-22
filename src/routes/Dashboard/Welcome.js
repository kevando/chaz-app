import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import { colors } from '../../config/styles';
import styles from './styles';
import Button from '../../components/Button';

class Welcome extends Component  {

  state = { showHow: false }


  render() {

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
            <Icon name="user" size={30} color={colors.blue} style={[styles.icon,{top: 28,left: 0,}]}/>
          </View>
        </View>
        <View style={styles.step} >
          <Text style={styles.stepText}>Save it in chaz</Text>
          <View style={[{width: 70},styles.iconsContainer]}>
            <Icon name="music" size={25} color={colors.yellow} style={[styles.icon,{top: 0,left: 40,}]}/>
            <Icon name="file-text" size={35} color={'white'} style={[styles.icon,{top: 10,left: 0,}]}/>
            <Icon name="user" size={25} color={colors.blue} style={[styles.icon,{top: 30,left: 40,}]}/>
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
