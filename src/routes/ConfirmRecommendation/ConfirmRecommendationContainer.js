import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

// import BottomButton from '../../components/Button';

import ConfirmRecommendation from './ConfirmRecommendation';
import Routes from '../../config/routes';

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
    const { navigator, saveRecommendation } = this.props;
    saveRecommendation(); // Redux


    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Dashboard'})
      ]
    })
    this.props.navigation.dispatch(resetAction)



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
