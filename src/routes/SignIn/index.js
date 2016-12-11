import SignInContainer from './SignInContainer';
import SignIn from './SignIn';

export { SignIn }; // do i need this?

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../../actions';

const mapStateToProps = (state) => {
  return {
    // isConnected: state.isConnected,
    uid: state.uid,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}


export default connect(mapStateToProps ,mapDispatchToProps)(SignInContainer);


// export default SignInContainer;
