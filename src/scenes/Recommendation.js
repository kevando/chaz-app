import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
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

class RecView extends Component {

  constructor(props) {
    super(props)
    // this will make it easier to handle the new props
    this.state = {rec:this.props.rec}
  }
  componentWillReceiveProps(newProps) {
    //user edited title or note, refresh data
    this.setState({rec: newProps.rec});
  }

  render(){
    let { dispatch } = this.props;
    let boundActionCreators = bindActionCreators(recActions, dispatch)
    var {rec} = this.state;

    return (
      <View  style={{flex:1}}>
        <View style={styles.row}>
          <View style={styles.left}>
            <RecType rec={rec} {...boundActionCreators} size={30} />
          </View>
          <View style={styles.right}>
            <RecTitle rec={rec} onPress={Actions.recommendationEdit}  />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}><Text style={{fontSize:20,textAlign:'center'}}><Emoji name="memo" /></Text></View>
          <View style={styles.right}>
            <RecNote rec={rec} onPress={Actions.recommendationEdit} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.left}><View style={styles.left}><Text style={{fontSize:20,textAlign:'center'}}><Emoji name="slightly_smiling_face" /></Text></View></View>
          <View style={styles.right}>
            <RecrItem rec={rec} {...boundActionCreators} />
          </View>
        </View>
      <View>
    </View>
    <TouchableOpacity onPress={this.deleteRec.bind(this)} style={{flex:1,marginLeft:50,marginTop:150,marginRight:50}}>
      <Text style={{color:'red',fontWeight:'600',textAlign:'center',padding:6}}>Delete Rec</Text>
    </TouchableOpacity>
    <KeyboardSpacer />
  </View>
    );
  }

  deleteRec(){
    var id = this.props.rec.id;
    this.props.dispatch(recActions.deleteRec(id));
    Actions.pop();
  }

}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
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
    recs: this.recs,
  };
}
export default connect(mapStateToProps)(RecView);
