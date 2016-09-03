import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, LayoutAnimation } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import * as counterActions from '../reducers/counter/actions';
// import * as recActions from '../../reducers/rec/actions';

import { connect } from 'react-redux';
import RecAddButton from '../components/RecAddButton';
import EmptyMessage from '../components/EmptyMessage';
import FilterNav from '../components/FilterNav';
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
 getVisibleRecs() {

   var activeFilter = this.props.app.get('activeFilter');
   // First add the Recr data (probly a better place to do this)
    var recrs = this.props.recrs;


   var visibleRecs = this.props.recs.map(function(rec) {

     var recrId = rec.get('recr_id');

     var recr = recrs.find(function(obj){
       return obj.get('id') === recrId;
     });
     var recWithRecr = rec.set('recr', recr)

    return recWithRecr;

   });
   //
  //  var visibleRecs = this.props.recs.filter(function(rec) {
  //    console.log('rec',rec);
  //    if(rec.get('type') == activeFilter){
  //      return rec;
  //    }
  //  });







  //  if(activeFilter != 'all')
  //     visibleRecs = this.props.recs.filter(rec => rec.get('type') == activeFilter);

  return visibleRecs;
  // return this.props.recs;
 }
  render() {

    // Might want to take this out of the render function
    // var recsLoaded = this.props.rec.get('loaded');

    var visibleRecs = this.getVisibleRecs();
    var totalRecs = this.props.recs
    var currentStep = this.props.onboard.get('currentStep'); // used for rendering the filter

    // if(recList.size == 0)
      // return(<EmptyMessage notify="You have no recs" instructions="Press the button below to get started" />)

    // return(<View><Text>current step: {currentStep}</Text></View>)

    return (
      <View style={styles.container}>
      {(currentStep > 3
        ?
        <FilterNav />
        :
        null
      )}

        <View style={{flex:10}} >
        {(totalRecs.size == 0
          ?
          <EmptyMessage title="Welcome to chaz" notify="When people in your life give you suggestions and recommendations, save them here." instructions="Tap the blue button to save your first recommendation." />
          :
          <ScrollView><RecList recs={visibleRecs.reverse()} /></ScrollView>
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
    recs: state.recs,
    recrs: state.recrs,
    app: state.app,
    onboard: state.onboard
  };
}

export default connect(mapStateToProps)(Recommendations);
