import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import InboxContainer from './InboxContainer';
import * as Actions from '../../reducers/reminders/actions';

const mapStateToProps = (state) => {
  return {
    // notificationPermission: state.app.notificationPermission,
    // reminders: state.reminders,
    openRecs: _.filter(state.recommendations.myRecs,rec => rec.status == "open")
  };
};

export default connect(mapStateToProps, { ...Actions })(InboxContainer);
