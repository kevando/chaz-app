import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileContainer from './ProfileContainer';

// import * as RecActions from '../../reducers/recommendations/actions';
import * as UserActions from '../../reducers/user/actions';

const mapStateToProps = (state) => {
  return {
    // recommendations: state.recommendations.list,
    // friends: state.friends,
    // activeFilter: state.recommendations.filter,
    // app: state.app,
    user: state.user,
    // showOnboarding: state.recommendations.list.length == 0,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...UserActions})(ProfileContainer);
