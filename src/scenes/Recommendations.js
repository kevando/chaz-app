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
import {colors} from '../style/Global';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {uid: this.props.app.getIn(['user','uid'])}
  }

  componentDidMount(){
    // Hide profile link during first opening of app
    var currentStep = this.props.onboard.get('currentStep');
    if(currentStep < 2)
      Actions.refresh({leftButtonTextStyle:{color:colors.purple}});
  }


  getGradedRecs() { // this fn will probly be used elsewhere

   // Filter rec list by uid, only showing recs 'given' to me
   var uid = this.state.uid;
   var activeFilter = this.props.app.get('activeFilter');
   var recs = this.props.recs.filter(function(obj){
     return (
      //  (obj.get('uid') === uid) && removing for now
       (obj.get('grade') != null) &&
       (obj.get('type') === activeFilter || activeFilter == 'all')
     );

   });

   return this.appendRecr(recs);
  }
 getQueue() { // this fn will probly be used elsewhere

  // Filter rec list by uid, only showing recs 'given' to me
  var uid = this.state.uid;
  var activeFilter = this.props.app.get('activeFilter');
  var recs = this.props.recs.filter(function(obj){
    return (
      // (obj.get('uid') === uid) && removing for now
      (obj.get('grade') == null) &&
      (obj.get('type') === activeFilter || activeFilter == 'all')
    );

  });

  return this.appendRecr(recs);
 }

 appendRecr(recs){
   // Then add the Recr data (probly a better place/way to do this)
   // But I want the latest data possible
   var recrs = this.props.recrs;
   return recs.map((rec) => rec.set('recr', recrs.find(obj => (obj.get('id') === rec.get('recr_id')))));
 }

  render() {
    var activeFilter = this.props.app.get('activeFilter');

    return (
      <View style={styles.container}>
        {this.renderFilterNav()}
        <View style={{flex:10}} >
          {(this.props.recs.size == 0
            ? this.renderWelcomeMessage()
            : this.renderRecLists()
          )}
        </View>
        <RecAddButton text="Add New Recommendation" activeFilter={activeFilter} onPress={this.onAddRecPress.bind(this)} />
      </View>
    );
  }

  renderFilterNav(){
    var currentStep = this.props.onboard.get('currentStep');
    if(currentStep > 2)
      return(<FilterNav />)
  }
  renderWelcomeMessage(){
    return(<EmptyMessage title="Welcome to chaz" notify="The fastest way to save recommendations in your phone." instructions="If you do not have anything to save yet, I would like to recommend my favorite movie, Shawshank Redemption." />);
  }
  renderRecLists(){
    var gradedRecs = this.getGradedRecs();
    var queue = this.getQueue();
    return(
      <ScrollView>
        <Text style={styles.title}>Queue ({queue.size})</Text>
        <RecList recs={queue} />
        {(gradedRecs.size > 0
          ?
          <View>
            <Text style={styles.title}>Graded Recommendations ({gradedRecs.size})</Text>
            <RecList recs={gradedRecs} />
          </View>
          :
          null
        )}

      </ScrollView>
    );

  }

  onAddRecPress(){
    Actions.recommendationAdd({uid:this.state.uid})
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor:'white',
    backgroundColor:colors.lightGrey,
    borderTopWidth: 0,

  },
  title: {
    margin:10,
    fontWeight:'600',
    fontSize:13,
    color:colors.darkGrey
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
