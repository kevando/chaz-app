import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import RecViewContainer from './RecViewContainer';
import * as RecActions from '../../reducers/recommendations/actions';
import * as FriendActions from '../../reducers/friends/actions';
import { setRecReminder } from '../../reducers/reminders/actions'

const mapStateToProps = ({app, recommendations,friends,user}, props) => {

  // incoming rec may be of either, in the future this might matter which one
  const rec = _.find(recommendations.myRecs, r => r.id == props.recId) || _.find(recommendations.givenRecs, r => r.id == props.recId)

  return {
    app,
    rec,
    friends, // needed for view refresh?
    user,
  };
};

export default connect(mapStateToProps, {...RecActions, ...FriendActions, setRecReminder})(RecViewContainer);
