import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

import Button from "react-native-button";
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux'
import * as recrActions from '../reducers/recr/actions';

class RecrItem extends Component {

  constructor(props) {
    super(props);
    this.state = {name: this.props.rec.name}
  }
  render() {
    console.log('recr props',this.props.recr)
    var recr = this.props.rec.recr;
    if(recr)
      return (<Text>{recr.name}</Text>)

    return (
      <Button onPress={this.onWhoPress.bind(this)} >Who recommended this?</Button>
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
