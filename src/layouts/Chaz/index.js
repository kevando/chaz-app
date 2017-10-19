import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Chaz from './Chaz';
import * as Actions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
    showOnboarding: state.recommendations.list.length == 0,
    recs: state.recommendations.list
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chaz);
