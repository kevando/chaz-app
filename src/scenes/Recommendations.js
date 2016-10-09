import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity, LayoutAnimation } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

// import * as counterActions from '../reducers/counter/actions';
// import * as recActions from '../../reducers/rec/actions';

import { connect } from 'react-redux';
import RecAddButton from '../components/RecAddButton';
import EmptyMessage from '../components/EmptyMessage';
import FilterNav from '../components/FilterNav';
import RecList from '../components/RecList';
import * as GlobalStyle from '../style/Global';
import {colors} from '../style/Global';

// tmp for meteor before we put this in redux
import ddpClient from '../ddp';

import { setRecs } from '../reducers/rec/actions';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    // this.state = {uid: this.props.app.getIn(['user','uid'])}
  }

  componentDidMount(){
    // Hide profile link during first opening of app
    // var currentStep = this.props.onboard.get('currentStep');
    // if(currentStep < 2)
    //   Actions.refresh({leftButtonTextStyle:{color:colors.purple}});

    // ddpClient.user() // does this do anything?
    //   .then((user) => {
    //     this.setState({user})
    //   });
      this.observeRecs();
  }

  observeRecs() {

    let observer = ddpClient.observe("recs"); // i think observer is out of the box
    observer.added = (id) => {
      // this.setState({posts: ddpClient.collections.posts})
      console.log('observed rec added')
      // this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      // this.setState({posts: ddpClient.collections.posts})
      // console.log('observer changed',ddpClient.collections.recs)
      // console.log('id',id);
      // console.log('oldFields',oldFields);
      // console.log('clearedFields',clearedFields);
      // console.log('newFields',newFields);
      // this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
    observer.removed = (id, oldValue) => {
      // this.setState({posts: ddpClient.collections.posts})
      console.log('observed a rec removed')
      // this.props.dispatch(setPosts(ddpClient.collections.posts));
    }
  }



  getAllRecs() { // this fn will probly be used elsewhere

    // removing this for now while i figure out hydration shit
    return this.props.recs;
   // Filter rec list by uid, only showing recs 'given' to me
   var uid = this.props.app.get('deviceId');
   var activeFilter = 'all';//this.props.app.get('activeFilter');
   var recs = this.props.recs.filter(function(obj){
     return (
      //  (obj.get('uid') === uid) && removing for now
       (obj.get('grade') != null) &&
       (obj.get('type') === activeFilter || activeFilter == 'all')
     );

   });

   return this.appendRecr(recs);
  }
  getGradedRecs() { // this fn will probly be used elsewhere

    // removing this for now while i figure out hydration shit
    return this.props.recs;
   // Filter rec list by uid, only showing recs 'given' to me
   var uid = this.props.app.get('deviceId');
   var activeFilter = 'all';//this.props.app.get('activeFilter');
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
  var uid = this.props.app.get('deviceId');
  var activeFilter = 'all';//this.props.app.get('activeFilter');
  var recs = this.props.recs.filter(function(obj){
    console.log('obj',obj)
    return (
      // (obj.get('uid') === uid) && removing for now
      // (obj.grade == null) &&
      // (obj.type === activeFilter || activeFilter == 'all')
      true
    );

  });

  // disabling for now
  // return this.appendRecr(recs);
  console.log('recs',recs)
  return recs;
 }

 appendRecr(recs){
   // Then add the Recr data (probly a better place/way to do this)
   // But I want the latest data possible
   var recrs = this.props.recrs;
   return recs.map((rec) => rec.set('recr', recrs.find(obj => (obj._id === rec.recr_id))));
 }


  render() {

    var activeFilter = 'all'; //get from redux

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
    // var currentStep = this.props.onboard.get('currentStep');
    // if(currentStep > 2)
      return(<FilterNav />)
  }
  renderWelcomeMessage(){
    return(<EmptyMessage title="Welcome to chaz" notify="The fastest way to save recommendations in your phone." instructions="If you do not have anything to save yet, I would like to recommend my favorite movie, Shawshank Redemption." />);
  }
  renderRecLists(){
    const recList = this.props.recs;
    return(
      <ScrollView>
        <Text style={styles.title}>All Recs</Text>
        <RecList recs={recList} />

      </ScrollView>
    );

  }
  renderRecLists_og(){
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
    // console.log('deviceId',this.props.app.get('deviceId'));
    Actions.recommendationAdd({uid:this.props.app.get('deviceId')}); // should store meteor data in app
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
    // onboard: state.onboard

  };
}

export default connect(mapStateToProps)(Recommendations);
