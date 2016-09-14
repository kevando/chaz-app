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
import {colors} from '../style/Global';

class RecrItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.rec.name}
    this.getRecr = this.getRecr.bind(this);
  }

  render() {

    var recr = this.getRecr(this.props.rec.recr_id);


    if(recr) {
      return (
        <TouchableOpacity onPress={this.onRecrPress.bind(this)} >
          <Text>Recommended by: <Text style={{fontWeight:'600',color:colors.green,fontSize:16}}>{recr.name}</Text></Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.onWhoPress.bind(this)} >
          <Text style={{fontWeight:'600',color:colors.green,fontSize:18}}>Who recommended this?</Text>
        </TouchableOpacity>
      )
    }

  }
  onWhoPress() {
    Actions.popup({data: RecommenderAdd,passProps:this.props.rec})
  }

  onRecrPress() {
    Actions.friend({recr: this.getRecr(this.props.rec.recr_id)});
  }
  getRecr(recr_id){
    var recr = this.props.recrs.find(function(obj){
      return obj._id === recr_id;
    });
    return recr ? recr : null ;
  }


}



function mapStateToProps(state) {
  return {
    recs: state.recs,
    recrs: state.recrs,
  };
}
export default connect(mapStateToProps)(RecrItem);
