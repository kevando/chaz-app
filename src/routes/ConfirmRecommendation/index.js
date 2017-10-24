import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import ConfirmRecommendationContainer from './ConfirmRecommendationContainer';
import * as Actions from '../../reducers/recommendations/actions';
// Also need action to create friend @todo maybe

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished,
    // recs: state.recommendations,
    friend: _.find(state.friends,friend => friend.id === state.recommendations.unfinished.friendId)
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRecommendationContainer);
