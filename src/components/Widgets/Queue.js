import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux'

import styles from './Styles';
import {colors} from '../../style/Global';

import { bindActionCreators } from 'redux'
import * as recActions from '../../reducers/rec/actions';

import RecListItem from '../RecListItem';

class Queue extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    let recs = this.props.recs.filter(rec => typeof rec.grade == "undefined")
    return (
      <View>
        <Text>You have {recs.size} ungraded recs</Text>
          {this.renderRecs(recs)}
      </View>
    );
  }
  renderRecs(recs){
    let { dispatch } = this.props;
    let boundActionCreators = bindActionCreators(recActions, dispatch)


    return (
      recs.valueSeq().map(rec => (
        <View key={rec._id}>
          <RecListItem rec={rec}  />
        </View>
      ))

    );
  }

}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    recs: state.recs,
    // app: state.app,
    // onboard: state.onboard

  };
}

export default connect(mapStateToProps)(Queue);
