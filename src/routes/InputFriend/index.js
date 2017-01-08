import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputFriendContainer from './InputFriendContainer';
import * as Actions from '../../reducers/recommendations/actions';
// Also need action to create friend @todo

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFriendContainer);
