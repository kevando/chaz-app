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

class RecrItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.rec.name}
  }
  render() {
    // console.log('recr props',this.props.recr)
    var recr = this.props.rec.recr;
    if(recr)
      return (<Text>{recr.name}</Text>)

    return (
      <TouchableOpacity onPress={this.onWhoPress.bind(this)} >
        <Text style={{fontWeight:'600',color:"green",fontSize:15}}>Who recommended this?</Text>
      </TouchableOpacity>
    );
  }
  onWhoPress() {
    Actions.recommenderAdd({rec:this.props.rec});
    // var rec = this.props.rec;
    // this.props.dispatch(recrActions.addRecr(name));
  }

}



function mapStateToProps(state) {
  return {
    recs: state.recs,
  };
}
export default connect(mapStateToProps)(RecrItem);
