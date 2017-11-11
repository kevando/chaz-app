import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import InboxContainer from './InboxContainer';
import * as Actions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    // notificationPermission: state.app.notificationPermission,
    myInvites: state.app.myInvites,
    openRecs: _.filter(state.recommendations.myRecs,rec => rec.status == "open")
  };
};

export default connect(mapStateToProps, { ...Actions })(InboxContainer);
