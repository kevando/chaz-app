import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InviteContainer from './InviteContainer';
import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import _ from 'lodash'

const mapStateToProps = (state, props) => {
  return {
    app: state.app,
    user: state.user,
    friend: _.find(state.friends,(f) => f.id === props.friend.id), // live refresh
  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(InviteContainer);
