import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Style from '../../style/Style';
// import RecType from './RecType';
export default class AddRecrButton extends Component {
  constructor(props) {
    super(props);
  }
  renderTypeEmoji(){
    if(this.props.activeType != "all")
      return <Text> <RecType type={this.props.activeType} size={22} /> </Text>
    else
      return <Text style={{fontSize:22}}> </Text>;
  }
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={ this.props.onPress }>
        <Text style={styles.buttonText}>Who recrd this?</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: Style.constants.colors[2],
    paddingTop:17,
    paddingBottom:17,
  },
  buttonText: {
    flex:1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing:1.3,
    height:30,
    justifyContent:'center'
  },

});
