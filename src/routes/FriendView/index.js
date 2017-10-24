import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FriendViewContainer from './FriendViewContainer';
import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(FriendViewContainer);
