import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, LayoutAnimation } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import * as counterActions from '../reducers/counter/actions';
// import * as recActions from '../../reducers/rec/actions';

import { connect } from 'react-redux';
import RecAddButton from '../components/RecAddButton';
import EmptyMessage from '../components/EmptyMessage';
// import FilterNav from '../containers/rec/FilterNav';
import RecList from '../components/RecList';
import * as GlobalStyle from '../style/Global';

class Recommendations extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
   // Animate creation
  //  LayoutAnimation.spring(); // I guess this fades it in.. not sure how or why
 }
  render() {

    // Might want to take this out of the render function
    // var recsLoaded = this.props.rec.get('loaded');

    var recList = this.props.recs; // was visible
    // var activeType = this.props.rec.getIn(['filters','type','active']);

    // if(recList.size == 0)
      // return(<EmptyMessage notify="You have no recs" instructions="Press the button below to get started" />)


    return (
      <View style={styles.container}>
        <View style={{flex:9}} >
        {(recList.size == 0
          ?
          <EmptyMessage title="Welcome to chaz" notify="Lets get started by guiding you through saving your first recommendation" instructions="Tap the blue button to save your first recommendation!" />
          :
          <ScrollView><RecList recs={recList.reverse()} /></ScrollView>
        )}
        </View>
        <RecAddButton activeType={"default"} onPress={Actions.recommendationAdd} />
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
    // borderTopColor: 'red'

  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});


function mapStateToProps(state) {
  return {
    recs: state.recs
  };
}

export default connect(mapStateToProps)(Recommendations);
