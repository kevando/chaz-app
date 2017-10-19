import React, { Component } from 'react';
// import { Keyboard } from 'react-native'
import ConfirmRecommendation from './ConfirmRecommendation';
import Routes from '../../config/routes';
import { Actions } from 'react-native-router-flux';

class ConfirmRecommendationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {showTitle: true}
  }

  _onSaveRecommendationPress() {
    this.setState({showTitle: false});
    setTimeout( () => {
      this.saveRecommendation();
    },400)

  }

  saveRecommendation() {
    const { saveRecommendation } = this.props;
    saveRecommendation(); // Redux
    Actions.reset('MainStack') 
  }

  render() {
    return (
      <ConfirmRecommendation
        onSaveRecommendationPress={this._onSaveRecommendationPress.bind(this)}
        {...this.props}
        {...this.state}
      />
    );
  }

}

export default ConfirmRecommendationContainer;
