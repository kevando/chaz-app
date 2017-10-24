import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RecViewContainer from './RecViewContainer';
import * as RecActions from '../../reducers/recommendations/actions';
import * as FriendActions from '../../reducers/friends/actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps, {...RecActions, ...FriendActions})(RecViewContainer);
