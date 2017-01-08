import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardContainer from './DashboardContainer';


// import actions

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.list,
  };
};

// map dispatch to props

export default connect(mapStateToProps, null)(DashboardContainer);
