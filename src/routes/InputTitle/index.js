import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputTitleContainer from './InputTitleContainer';
import * as Actions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished, // not used currently
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputTitleContainer);
