import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import InvitesContainer from './InvitesContainer';
import { signOut, refreshServerToken, setAppData } from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  // console.log(state.recommendations)
  return {
    invitations: state.recommendations.givenRecs,
    // friends: state.friends,
    // onlineFriends: _.filter(state.friends,'uid'),
    // user: state.user,
  };
};

export default connect(mapStateToProps, { refreshServerToken, signOut, setAppData })(InvitesContainer);
