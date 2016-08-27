import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AlertIOS,ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux'
import * as recActions from '../reducers/rec/actions';
import RecNote from '../components/RecNote';
import RecTitle from '../components/RecTitle';
import RecType from '../components/RecType';
import RecrItem from '../components/RecrItem';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Emoji from 'react-native-emoji';
import RecAddButton from '../components/RecAddButton';
import {constants} from '../style/Global';

class Friend extends Component {

  constructor(props) {
    super(props)
    // this will make it easier to handle the new props
    this.state = {recr:this.props.recr}
    // Set delete button in top right



  }
  componentWillMount(){
    // Actions.refresh({rightTitle: "Delete", onRight:() => this.onDeletePress(), rightButtonTextStyle: {color:'red'} })
  }
  componentWillReceiveProps(newProps) {
    //user edited title or note, refresh data
    // this.setState({rec: newProps.rec});
  }

  render(){
    // let { dispatch } = this.props;
    // let boundActionCreators = bindActionCreators(recActions, dispatch)
    // var {rec} = this.state;
    // var filters = this.props.app.get('filters');

    return (
      <View  style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text>Name:</Text>
          </View>
          <View style={styles.right}>
            <Text>{this.props.recr.name}</Text>
          </View>
        </View>
      <View>
    </View>
    </ScrollView>
    <RecAddButton activeType={"default"} recr={this.props.recr} onPress={Actions.recommendationAdd} />
  </View>
    );
  }

  onDeletePress(){
    var Options = [
      { text: 'Yes', onPress: () => {this.deleteRec() } },
      { text: 'Cancel', onPress: () => console.log('action canelled') }
    ];
    AlertIOS.alert('Are you sure?',null,Options);
  }

  deleteRec(){
    var id = this.props.rec.id;
    this.props.dispatch(recActions.deleteRec(id));
    Actions.pop();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor:constants.colors[1],
    // backgroundColor:'#444',
    borderTopWidth: 2,
    flexDirection:'column'

    // borderTopColor: 'red'

  },
  row: {
    // backgroundColor: 'red',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // inner rows on top of each other
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5,

  },

  left: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  right: {
    flex:8,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor:'#fff',
    paddingLeft:5
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing:1.1
  },
  note: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '300',
    color: "#666",
    letterSpacing:1.0,
    marginTop:5
  }

});


function mapStateToProps(state) {
  return {
    // recs: this.recs,
    app: state.app
  };
}
export default connect(mapStateToProps)(Friend);
