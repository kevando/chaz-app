import DashboardContainer from './DashboardContainer';
// import Dashboard from './Dashboard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import actions

const mapStateToProps = (state) => {
  return {
    username: state.user.name
  };
};

// map dispatch to props

export default connect(mapStateToProps, null)(DashboardContainer);
