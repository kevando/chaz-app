import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterContainer from './RegisterContainer';
import * as AppActions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...AppActions})(RegisterContainer);
