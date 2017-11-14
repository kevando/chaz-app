import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DebugContainer from './DebugContainer';

import * as UserActions from '../../reducers/user/actions';
import * as AppActions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    // recommendations: state.recommendations.list,
    user: state.user,
    app: state.app,
  };
};

export default connect(mapStateToProps, {...AppActions, ...UserActions})(DebugContainer);
