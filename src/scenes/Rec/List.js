import React, {Component} from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import * as counterActions from '../../reducers/counter/actions';
// import * as recActions from '../../reducers/rec/actions';
import * as firebaseActions from '../../reducers/firebase/actions';


import { connect } from 'react-redux';
import AddRecButton from '../../components/rec/AddRecButton';
// import * as recActions from '../../reducers/rec/actions';
// import * as recrActions from '../../reducers/recr/actions';
// import Loading from '../../components/LoadingComponent';
import Onboarding from '../../containers/Onboarding';
import FilterNav from '../../containers/rec/FilterNav';
import RecList from '../../components/rec/RecList';
import * as GlobalStyle from '../../style/Style';


// const Register = () => (
class List extends Component {
  constructor(props) {
    super(props);
    console.log('props from RecList',this.props)


  }

  render() {

    // Might want to take this out of the render function
    // var recsLoaded = this.props.rec.get('loaded');

    // if(!recsLoaded){
    //   // return (<Loading message="Loading Recs from Firebase" />);
    // }

    var recList = this.props.rec.getIn(['all']); // was visible
    var activeType = this.props.rec.getIn(['filters','type','active']);

    // if(recList.size == 0)
    //   return(<Onboarding notify="You have no recs" guide="Press the button below to get started" />)


    return (
      <View style={styles.container}>
        <FilterNav />
        <View style={{flex:9}} >
          <ScrollView><RecList recList={recList} /></ScrollView>

        </View>
        <AddRecButton activeType={"default"} onPress={this.onAddRecPress.bind(this)} />
      </View>
    );
  }

  onAddRecPress() {

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor:GlobalStyle.constants.colors[1],

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
    counter: state.counter,
    rec: state.rec
  };
}

export default connect(mapStateToProps)(List);
