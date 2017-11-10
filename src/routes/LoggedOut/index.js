import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoggedOut from './LoggedOut';
import * as AppActions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    app: state.app,
  };
};

export default connect(mapStateToProps, AppActions)(LoggedOut);
