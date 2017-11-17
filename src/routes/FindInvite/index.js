import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import FindInviteContainer from './FindInviteContainer';

import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import * as AppActions from '../../reducers/app/actions';
const mapStateToProps = (state) => {

  return {
    friends: state.friends,
    unfinished: state.recommendations.unfinished,
    app: state.app,
    notificationPermission: state.app.notificationPermission,
    user: state.user,
    feelings: state.feelings,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...AppActions,...RecActions, ...FriendActions})(FindInviteContainer);
