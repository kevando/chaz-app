import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecInputContainer from './RecInputContainer';
import * as Actions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished,
    // onboard: state.onboard.step,

  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecInputContainer);
