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

class RecrItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.rec.name}
  }
  render() {
    // console.log('recr props',this.props.recr)
    var recr = this.props.rec.recr;

    return (
      <TouchableOpacity onPress={this.onWhoPress.bind(this)} >
      {( recr
        ? <Text style={{fontWeight:'600',color:"green",fontSize:15}}>{recr.name}</Text>
        :<Text style={{fontWeight:'600',color:"green",fontSize:15}}>Who recommended this?</Text>
      )}
      </TouchableOpacity>
    );
  }
  onWhoPress() {
    Actions.popup({data: RecommenderAdd,passProps:this.props.rec})
  }

}



function mapStateToProps(state) {
  return {
    recs: state.recs,
  };
}
export default connect(mapStateToProps)(RecrItem);
