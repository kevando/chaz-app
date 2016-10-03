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

import RecrItem from '../RecrItem';

class NeedsRecr extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    let recs = this.props.recs.filter(rec => typeof rec.recr_id == "undefined");

    return (
      <View>
        <Text>You have {recs.size} recs that need recommenders</Text>
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
          <RecrItem rec={rec} {...boundActionCreators} />
          <Text>{rec.title}</Text>
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

export default connect(mapStateToProps)(NeedsRecr);
