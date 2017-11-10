import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import RecInputContainer from './RecInputContainer';
import * as RecActions from '../../reducers/recommendations/actions';
import * as FriendActions from '../../reducers/friends/actions';
import * as AppActions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    unfinished: state.recommendations.unfinished,
    friends:  _.filter(state.friends, f =>  f.name),
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...RecActions, ...FriendActions, ...AppActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecInputContainer);
