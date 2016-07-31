import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';
import RecType from '../components/rec/RecType';
const GlobalStyle = require('../style/Style');
import Emoji from 'react-native-emoji'

class Onboarding extends Component {
  constructor(props) {
    super(props);
    // put initial onboarding stuff here, then move this to redux as i get a
    // better handle on this
    this.state = {
      onboarding: {

      }
    }
  }
  renderTypeEmoji(filter){
    if(filter != "all")
      return <Text> <RecType type={filter} size={22} /> </Text>
    else
      return " ";
  }

  render() {
    // display onboarding messages and alerts from state
    // For now this is just going to be the onboarding message for RecList
    // I will probably want to expand this later


    var activeTypeFilter = (this.props.filters.getIn(['type','active']));

    if(this.props.rec.getIn(['all']).size == 0 && activeTypeFilter == "all") {
      return (
        <View style={styles.loadingContainer}>
        <Text style={{fontSize:85,color:'#444',textAlign:'center',marginBottom:20}}>
        <Emoji name="raised_hands" />
        </Text>
          <Text style={{fontSize:32,color:'#222',textAlign:'center',marginBottom:10}}>
          Welcome to Chaz
          </Text>
          <Text style={{fontSize:22,color:'#222',textAlign:'center',margin:10}}>
          Use this app when people recommend things to you.
          </Text>

        </View>
      )
    }

    return (
      <View style={styles.loadingContainer}>
      <Text style={{fontSize:85,color:'#444',textAlign:'center',marginBottom:20}}>
      <Emoji name="open_file_folder" />
      </Text>
        <Text style={{fontSize:22,color:'#222',textAlign:'center',margin:10}}>
        You have not saved any <Text style={{fontWeight:'600'}}>{activeTypeFilter}</Text> recommendations yet.
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor:GlobalStyle.constants.colors[4],
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  animationContainer: {
    height:50,

  }
})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    filters: state.rec.get('filters'),
    rec: state.rec,
  }
}

export default connect(mapStateToProps)(Onboarding);
