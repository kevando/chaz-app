import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import GodViewContainer from './GodViewContainer';
import * as RecActions from '../../reducers/recommendations/actions';


const mapStateToProps = (state) => {
  return {
    app: state.app,
    user: state.user,
    recs: state.recommendations.all
  };
};

export default connect(mapStateToProps, { ...RecActions })(GodViewContainer);
