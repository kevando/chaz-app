import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import ProfileContainer from './ProfileContainer';
import { signOut } from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    givenRecs: state.recommendations.givenRecs,
    friends: state.friends,
    onlineFriends: _.filter(state.friends,'uid'),
    user: state.user,
  };
};

export default connect(mapStateToProps, { signOut })(ProfileContainer);
