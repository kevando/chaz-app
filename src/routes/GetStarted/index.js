import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import GetStartedContainer from './GetStartedContainer';

import * as UserActions from '../../reducers/user/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import * as AppActions from '../../reducers/app/actions';
import * as FriendsActions from '../../reducers/friends/actions';
const mapStateToProps = (state) => {

  return {
    friends: state.friends,
    unfinished: state.recommendations.unfinished,
    app: state.app,

    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...FriendsActions, ...AppActions,...RecActions, ...UserActions})(GetStartedContainer);
