import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text, width,MARGIN_LEFT, NAV_BAR_HEIGHT, STATUS_BAR_HEIGHT } from '../config/styles';
import * as Animatable from 'react-native-animatable';

// FancyButton = Animatable.createAnimatableComponent(Button);



// ---------------------------------------
//  CONTAINER
// ---------------------------------------

export const Container = (props) => {
  // const { black, center, sub } = props
  const styles = [
    containerStyles.container,
    // props.card && titleStyles.card,
    // black && {color: colors.black},
    // center && {textAlign: 'center'},
    // sub && {fontSize: 15, fontWeight: '300', height: 30,lineHeight: 20},

    {
      borderTopWidth: STATUS_BAR_HEIGHT,
      borderColor: StatusBar.hidden ? 'red' : colors.newBlue,
      paddingHorizontal: MARGIN_LEFT,
    }
  ]
  return (
    <View style={styles}>

      {props.children}

    </View>
  )
}

const containerStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },


});


// ---------------------------------------
//  TITLE
// ---------------------------------------

export const Title = (props) => {
  const { black, center, sub, header, question, fontSize=30 } = props
  const styles = [
    titleStyles.text,
    {fontSize},
    props.card && titleStyles.card,
    black && {color: colors.black},
    center && {textAlign: 'center'},
    sub && {fontSize: 15, fontWeight: '300', height: 30,lineHeight: 20},

    header && {marginTop: 50},
    question && {fontSize: 22},
  ]
  return (
    <Text style={styles}>{props.children}</Text>
  )
}

const titleStyles = StyleSheet.create({

  text: {
    ...text,
    color: 'white',
    // fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 0,
    // paddingLeft: MARGIN_LEFT,
    // marginHorizontal: 10,
    // backgroundColor: colors.lightWhite,
    // marginTop: STATUS_BAR_HEIGHT+NAV_BAR_HEIGHT,
    height: NAV_BAR_HEIGHT,
    lineHeight: NAV_BAR_HEIGHT,
    // marginLeft: 5

  },
  card: {
    fontSize: 20,
    fontWeight: '700',
    paddingLeft: 20,
    marginBottom: 0,
    lineHeight: 60, // float near bottom
  }

});


// ---------------------------------------
//  Label
// ---------------------------------------

export const Label = (props) => {
  const styles = [
    labelStyles.text,
    props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    props.title && {fontSize: 20,fontWeight: '600'},
    props.large && {fontSize: 20,fontWeight: '700'},
  ]
  return (
    <Text style={styles}>{props.children}</Text>
  )
}

const labelStyles = StyleSheet.create({

  text: {
    ...text,
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    lineHeight:20,
    marginTop:15,
    marginHorizontal: 12,
    // marginRight: 12,
  },

});


// ---------------------------------------
//  Button
// ---------------------------------------

export const Button = ({ text, onPress, color, bgcolor, rounded, animated, ghost, center, fat, small }) => {

  const styles = StyleSheet.create({

    container:
    {
      backgroundColor: bgcolor ? colors[bgcolor] : colors.green,
      borderColor: bgcolor ? colors[bgcolor] : colors.green,
      borderRadius: 0,
      borderWidth: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    ghost: {
      // color: 'white',
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: 'transparent',
    },
    text: {
      fontFamily: 'System',
      letterSpacing: 0.5,
      fontWeight: '500',
      // ^^^^ ...text not working for some reason
      margin: 0,
      fontSize: rounded ? 13 :17,
      borderWidth: 0,
      margin: 0,
      color: color || 'white',
      textAlign: center ? 'center' : 'left',
      // backgroundColor:'green'
    },
    fat: {
      marginVertical: 20,
      marginHorizontal: 20,
      paddingVertical: 20,
      paddingHorizontal: 30,
      borderRadius: 40,
    },
    rounded: {

      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 0,


    },
    small: {
      height: 20
    }
  })

  let buttonStyles = [
    styles.container,
    ghost && styles.ghost,
    rounded && styles.rounded,
    fat && styles.fat,
    small && styles.small,
  ]


  let ButtonContainer = (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} >
      <View style={buttonStyles}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  )

  if(animated) {
    return (
      <Animatable.View animation='fadeInUp' delay={300} duration={500}>
        {ButtonContainer}
      </Animatable.View>
    )

  } else {
    return ButtonContainer
  }

};




// ---------------------------------------
//  Divider
// ---------------------------------------


export const Divider = ({color='#eee'}) => {
  const dividerStyles = [
    // styles.label,
    {
      // flex: 1,
      backgroundColor: color,
      padding: 0,
      height: 1,
      marginVertical: 20,
    }
  ]
  return (
    <View style={dividerStyles} />
  )
}
