import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AlertIOS,ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux'
import * as recActions from '../reducers/rec/actions';
import * as recrActions from '../reducers/recr/actions';
import RecNote from '../components/RecNote';
import RecTitle from '../components/RecTitle';
import RecType from '../components/RecType';
import RecGradeSelecter from '../components/RecGradeSelecter';
// import RecChat from '../components/RecChat';
import RecrItem from '../components/RecrItem';
import ReceeItem from '../components/ReceeItem'; // change this name please
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Emoji from 'react-native-emoji';
import RecAddButton from '../components/RecAddButton';
import {colors} from '../style/Global';

import moment from 'moment';

class RecView extends Component {

  constructor(props) {
    super(props)
    // this will make it easier to handle the new props
    // console.log('this rec',this.props.rec);
    this.state = {rec:this.props.rec}
    // Set delete button in top right



  }
  componentWillMount(){
    var d = new Date(this.props.rec.created_at);
    Actions.refresh({
      rightTitle: "Delete",
      onRight:() => this.onDeletePress(),
      rightButtonTextStyle: {color:colors.red},
      title: moment(d).format('MM/DD/YYYY')
     })
  }
  componentWillReceiveProps(newProps) {
    //user edited title or note, refresh data
    this.setState({rec: newProps.rec});
    console.log('rec got new props',newProps)
  }

  render_tmp() {

    return (
      <View  style={styles.container}><Text>REC!!</Text></View>);
  }

  render(){
    let { dispatch } = this.props;
    let boundActionCreators = bindActionCreators(recActions, dispatch)
    let recrActionCreators = bindActionCreators(recrActions, dispatch)
    var {rec} = this.state;
    var categories = this.props.categories;//app.get('filters');
    console.log('render recView again',rec)

    return (
      <View  style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <View style={styles.left}>
            <RecType rec={rec} {...boundActionCreators} size={30} categories={categories} />
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

        {(rec.recr_id // only allow grading if recr is added
          ?
          <View style={styles.row}>
            <View style={styles.left}>
            </View>
            <View style={styles.right}>
              <RecGradeSelecter rec={rec} {...boundActionCreators} {...recrActionCreators}  />
            </View>
          </View>
          :
          null
        )}
      <View>
    </View>
    </ScrollView>
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
    var rec = this.props.rec;
    console.log(rec);
    this.props.dispatch(recActions.deleteRec(rec));
    // this.props.dispatch(recrActions.updateRecrStats(rec));
    Actions.pop();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor:colors.darkGrey,
    borderTopWidth: 1,
    flexDirection:'column'
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

});


function mapStateToProps(state) {
  return {
    // recs: this.recs,
    app: state.app,
    categories: state.categories
  };
}
export default connect(mapStateToProps)(RecView);
