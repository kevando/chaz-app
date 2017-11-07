import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import RemindersContainer from './RemindersContainer';
import * as Actions from '../../reducers/reminders/actions';

const mapStateToProps = (state) => {
  return {
    notificationPermission: state.app.notificationPermission,
    reminders: state.reminders,
  };
};

export default connect(mapStateToProps, { ...Actions })(RemindersContainer);
