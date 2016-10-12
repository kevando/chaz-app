import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {connect} from 'react-redux'

import styles from './styles';
// import {colors} from '../../style/Global';

// import { bindActionCreators } from 'redux'
// import * as recActions from '../../reducers/rec/actions';

// import RecListItem from '../RecListItem';

class MovieQueue extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount

  render() {
    // let recs = this.props.recs.filter(rec => typeof rec.grade == "undefined")
    const {onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text>Movies</Text>
          <View>
          <Text>You movie recs</Text>  
          </View>


      </View>
      </TouchableOpacity>
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

export default MovieQueue;
// function mapStateToProps(state) {
//   return {
//     categories: state.categories,
//     recs: state.recs,
//     // app: state.app,
//     // onboard: state.onboard
//
//   };
// }
//
// export default connect(mapStateToProps)(Queue);
