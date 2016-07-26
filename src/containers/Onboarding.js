import React, { Component } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import * as appActions from '../reducers/app/actions';
const GlobalStyle = require('../style/Style');

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


  render() {
    // display onboarding messages and alerts from state
    // For now this is just going to be the onboarding message for RecList
    // I will probably want to expand this later

    // dont display the word all
    var activeGradeFilter = (this.props.filters.getIn(['grade','active']) != 'all' ? this.props.filters.getIn(['grade','active']) : '');
    var activeTypeFilter = (this.props.filters.getIn(['type','active']) != 'all' ? this.props.filters.getIn(['type','active']) : '');
    return (
      <View style={styles.loadingContainer}>
        <Text style={{fontSize:15,color:'#444',textAlign:'center'}}>

        You have not saved any {activeGradeFilter} {activeTypeFilter} recommendations.

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
    justifyContent:'center'
  },
  animationContainer: {
    height:50,

  }
})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    filters: state.rec.get('filters'),
  }
}

export default connect(mapStateToProps)(Onboarding);
