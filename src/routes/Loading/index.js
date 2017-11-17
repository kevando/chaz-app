import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';

class Loading extends React.Component {


  // componentDidMount() {
  //   const { onboarding, setAppData } = this.props
  //   if(onboarding)
  //     setAppData({onboarding: true})
  // }

  render() {

    // return null

    return (
      <Animatable.View
          style={styles.container}
          animation="fadeOutUp"
          delay={300}
          duration={500}
          easing="ease-in-back"
          onAnimationEnd={() => {this.props.updateState({isReady:true})}}
          ref="ios"
          >

            <Icon name="heart" color={colors.yellow} size={130} />

      </Animatable.View>
    );

  }

  render_withxcodedelay() {
  // console.log('am i ever rendered?')
    return (
      <Animatable.View
          style={styles.container}
          animation="fadeOut"
          delay={1000}
          duration={250}
          easing="ease-in-quad"
          onAnimationEnd={() => {this._heartFadeIn()}}
          ref="ios"
          >
          <Animatable.View ref="heartView" easing="ease-out-quint">
            <Icon name="heart" color={colors.yellow} size={130} />
          </Animatable.View>
      </Animatable.View>
    );

  }
}

export default Loading;



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.blueBG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing:4,
    marginBottom: 20,
    marginHorizontal: 20,
  },

});



//
//
// _heartFadeOut = () => {
//
//   // const delay = 1400
//   //
//   // setTimeout(() => {
//   //
//   //   this.refs.heartView.zoomOut(1000)
//   //     .then((endState) => {
//   //       console.log(endState.finished ? 'bounce finished' : 'bounce cancelled')
//   //       // alert('fadeout done')
//   //       this.props.updateState({isReady:true})
//   //     })
//   // },delay)
//
//
// }
