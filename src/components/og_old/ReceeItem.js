import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux'
import * as recrActions from '../reducers/recr/actions';

import RecommenderAdd from '../components/RecommenderAdd';

class ReceeItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.rec.name}
    this.getRecr = this.getRecr.bind(this);
  }

  render() {
    var recee = null;
    // console.log('recr props',this.props.recr)
    // var recr = this.getRecr(this.props.rec.recr_id)
    var rec = this.props.rec;
    // Either this was sent or received
    var uid = this.props.app.getIn(['user','uid']);
    if(uid == rec.uid)
      recee = 'Me'

    if(rec.uid != null && uid != rec.uid) {
      Recee = this.props.recrs.find(function(obj){return obj.get('uid') === rec.uid; })
      // console.log('Recee',Recee)
        recee = Recee.get('name')
    }


    if(recee) {
      return (
        <TouchableOpacity onPress={this.onRecrPress.bind(this)} >
          <Text>Recommended to: <Text style={{fontWeight:'600',color:"green",fontSize:16}}>{recee}</Text></Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.onWhoPress.bind(this)} >
          <Text style={{fontWeight:'600',color:"green",fontSize:20}}>Who is this recd to?</Text>
        </TouchableOpacity>
      )
    }

  }
  onWhoPress() {
    Actions.popup({data: RecommenderAdd,passProps:this.props.rec})
  }

  onRecrPress() {
    Actions.friend({recr: this.props.rec.recr});
  }
  getRecr(recr_id){
    var recr = this.props.recrs.find(function(obj){
      return obj.get('id') === recr_id;
    });
    return recr;
  }


}



function mapStateToProps(state) {
  return {
    recs: state.recs,
    recrs: state.recrs,
    app: state.app,
  };
}
export default connect(mapStateToProps)(ReceeItem);
