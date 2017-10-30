import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ProfileContainer from './ProfileContainer';
import { signOut } from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    givenRecs: state.recommendations.givenRecs,
    friends: state.friends,
    user: state.user,
  };
};

export default connect(mapStateToProps, { signOut })(ProfileContainer);
