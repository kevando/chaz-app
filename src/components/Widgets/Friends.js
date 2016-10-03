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
import RecrListItem from '../RecrListItem';

class Friends extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    let recrs = this.props.recrs;//.filter(rec => typeof rec.recr_id == "undefined");

    return (
      <View>
        <Text>You saved {recrs.size} friends</Text>
          {this.renderRecrs(recrs)}
      </View>
    );
  }
  renderRecrs(recrs){
    // let { dispatch } = this.props;
    // let boundActionCreators = bindActionCreators(recActions, dispatch)


    return (
      recrs.valueSeq().map(recr => (
        <View key={recr._id}>
          <RecrListItem recr={recr} />

        </View>
      ))

    );
  }

}


function mapStateToProps(state) {
  return {
    categories: state.categories,
    recs: state.recs,
    recrs: state.recrs,
    // onboard: state.onboard

  };
}

export default connect(mapStateToProps)(Friends);
