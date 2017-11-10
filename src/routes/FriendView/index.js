import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FriendViewContainer from './FriendViewContainer';
import * as FriendActions from '../../reducers/friends/actions';
import * as RecActions from '../../reducers/recommendations/actions';
import _ from 'lodash'

const mapStateToProps = (state, props) => {
  let friendRecs = state.recommendations.myRecs.concat(state.recommendations.givenRecs)
  friendRecs = _.filter(friendRecs,rec => rec.from.id == props.friend.id || rec.to.id == props.friend.id)
  friendRecs = _.orderBy(friendRecs,['createdAt'],['desc'])
  // const myRecsWithFriendData =  _.map(myRecs, rec => {return {...rec,friend: _.find(myFriends,friend => friend.id === rec.from.id) || {} } })
  return {
    app: state.app,
    user: state.user,
    friend: _.find(state.friends,(f) => f.id === props.friend.id),
    friends: state.friends,
    friendRecs,
  };
};

export default connect(mapStateToProps, {...FriendActions,...RecActions})(FriendViewContainer);
