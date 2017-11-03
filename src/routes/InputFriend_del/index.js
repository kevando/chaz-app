import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputFriendContainer from './InputFriendContainer';
import * as RecActions from '../../reducers/recommendations/actions';
import * as FriendActions from '../../reducers/friends/actions';

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished,
    friends: state.friends
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...RecActions, ...FriendActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFriendContainer);
