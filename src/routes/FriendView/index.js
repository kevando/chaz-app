import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FriendViewContainer from './FriendViewContainer';
import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    app: state.app,
    myRecs: state.recommendations.myRecs,
  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(FriendViewContainer);
