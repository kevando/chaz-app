import React, {Component, PropTypes} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import * as onboardActions from '../reducers/onboard/actions';
import * as GlobalStyle from '../style/Style';


class OnboardPopup extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('popup props',this.props);
    const {title,caption,instructions,buttonText,buttonColor} = this.props;
    return (
      <View style={styles.container} >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{caption}</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <TouchableOpacity onPress={ this.onButtonPress.bind(this) }>
          <Text style={[styles.button,{backgroundColor:GlobalStyle.constants.colors[buttonColor]}]}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }


  onButtonPress() {
    this.props.navigator.dismissLightBox();
  }
}

const styles = StyleSheet.create({

  container: {
    // backgroundColor: '#ccc',
    flex:1,
    flexDirection:'column',
    borderWidth:0,
    borderColor:'#fff',
    padding:30,
    margin:30,

  },
  title: {
    textAlign: 'center',
    fontSize: 38,
    fontWeight:'600',
    marginBottom: 10,
    marginTop:10,
    color:"#fff"
  },
  caption: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight:'200',
    marginBottom: 2,
    marginTop:2,
    color:"#fff"
  },
  instructions: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight:'200',
    marginBottom: 2,
    marginTop:2,
    color:"#fff"
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:20,
    backgroundColor: GlobalStyle.constants.colors[1],
    color: '#fff',
    padding: 10
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    onboard: state.onboard,
  };
}

export default connect(mapStateToProps)(OnboardPopup);
