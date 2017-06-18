import React, { Component } from 'react';
import Button from '../../components/Button';

import ConfirmRecommendation from './ConfirmRecommendation';
import Routes from '../../config/routes';

class ConfirmRecommendationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {showTitle: true}
  }

  _onSaveRecommendationPress() {
    this.setState({showTitle: false})
    setTimeout( () => {
      this.saveRecommendation();
    },400)

  }

  saveRecommendation() {
    const { navigator, saveRecommendation } = this.props;
    saveRecommendation(); // Redux

    // navigator.pop();
    navigator.push(Routes.getDashboardRoute());
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
