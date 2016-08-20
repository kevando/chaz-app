import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as GlobalStyle from '../style/Global';
// import RecType from './RecType';
export default class AddRecButton extends Component {
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
        <Text style={styles.buttonText}>Add New Recommendation</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyle.constants.colors[1],
    paddingTop:17,
    paddingBottom:17,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing:1.1,
    justifyContent:'center'
  },

});
