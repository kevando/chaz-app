import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileContainer from './ProfileContainer';

// import * as RecActions from '../../reducers/recommendations/actions';
import * as UserActions from '../../reducers/user/actions';

const mapStateToProps = (state) => {
  return {
    givenRecs: state.recommendations.givenRecs,
    friends: state.friends,
    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...UserActions})(ProfileContainer);
