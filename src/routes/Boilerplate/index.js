import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import BoilerplateContainer from './BoilerplateContainer';
// import {  } from '../../reducers//actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
    user: state.user,
  };
};

export default connect(mapStateToProps, {  })(BoilerplateContainer);
