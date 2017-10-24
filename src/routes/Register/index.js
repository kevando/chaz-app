import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterContainer from './RegisterContainer';
import * as UserActions from '../../reducers/user/actions';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...UserActions})(RegisterContainer);
