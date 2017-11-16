import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Chaz from './Chaz';
import * as Actions from '../../reducers/app/actions';
import * as UserActions from '../../reducers/user/actions';

const mapStateToProps = (state) => {
  return {
    onboarding: state.app.onboarding,
    isAuthenticated: state.app.isAuthenticated,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...Actions, ...UserActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chaz);
