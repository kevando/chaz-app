import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Chaz from './Chaz';
import * as Actions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    // onboarding: state.app.onboarding,
    isAuthenticated: state.app.isAuthenticated,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chaz);
