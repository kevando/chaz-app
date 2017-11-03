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
    // apperanrly we can have more than 1 friend here :)
    friend: _.find(state.friends,(f) => f.id === props.friend.id),
  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(FriendViewContainer);
