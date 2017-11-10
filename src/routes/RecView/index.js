import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import RecViewContainer from './RecViewContainer';
import * as RecActions from '../../reducers/recommendations/actions';
import * as FriendActions from '../../reducers/friends/actions';
import { setRecReminder } from '../../reducers/reminders/actions'
const mapStateToProps = (state, props) => {
  return {
    app: state.app,
    recLive: _.find(state.recommendations.myRecs, rec => rec.id == props.rec.id),
    friends: state.friends, // needed for view refresh?
    user: state.user,
  };
};

export default connect(mapStateToProps, {...RecActions, ...FriendActions, setRecReminder})(RecViewContainer);
