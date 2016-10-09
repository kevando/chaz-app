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

import RecType from '../RecType';

class Uncategorized extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    let recs = this.props.recs.filter(rec => typeof rec.type == "undefined")
    return (
      <View>
        <Text>You have {recs.size} uncategorized recs</Text>
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
          <RecType rec={rec} {...boundActionCreators} size={20} categories={this.props.categories} />
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

export default connect(mapStateToProps)(Uncategorized);
