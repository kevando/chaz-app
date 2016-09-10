import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, LayoutAnimation } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';
import RecAddButton from '../components/RecAddButton';
import RecrList from '../components/RecrList';
import * as GlobalStyle from '../style/Global';

class Friends extends Component {
  constructor(props) {
    super(props);
  }

 getRecrs() {
  return this.props.recrs;
 }
  render() {

    var friendList = this.getRecrs();

    return (
      <View style={styles.container}>
        <View style={{flex:10}} >
          <ScrollView><RecrList recrs={friendList.reverse()} /></ScrollView>
        </View>
        
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor:GlobalStyle.constants.colors[1],
    backgroundColor:'#eee',
    borderTopWidth: 2,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
});


function mapStateToProps(state) {
  return {
    recrs: state.recrs,
  };
}

export default connect(mapStateToProps)(Friends);
