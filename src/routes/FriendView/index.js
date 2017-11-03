import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FriendViewContainer from './FriendViewContainer';
import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import _ from 'lodash'

const mapStateToProps = (state, props) => {
  // console.log('map props',props)
  return {
    app: state.app,
    user: state.user,
    myRecs: _.filter(state.recommendations.myRecs,rec => rec.friendId == props.friend.id),
    // givenRecs: _.filter(state.recommendations.givenRecs,rec => rec.to == props.friend.uid),

    // Doing it this way so that friends listener fires new changes to the UI
    // friend: _.find(state.friends,(friend) => friend.id === props.friendObject.id),


  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(FriendViewContainer);
