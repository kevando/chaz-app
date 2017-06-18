import React, {Component} from 'react';
// import {View,Text,Button,Animated} from 'react-native';
import { StackNavigator, Transitioner } from 'react-navigation';
import Routes, { RouteConfigs } from '../../config/routes';
import styles, {headerStyle} from './styles';


class Chaz extends Component {

  componentDidMount() {
    // If this function grows, consider a initializeApp action
    const { checkNotificationPermission } = this.props;
    checkNotificationPermission();
  }


  render() {

    const store = this.context.store.getState();

    const initialRoute = store.recommendations.list.length == 0 ? 'Hello' : 'Dashboard';
    // const initialRoute = 'ConfirmRecommendation';

    const StackNavigatorConfig = {
      initialRouteName: initialRoute,
      mode:'modal',
      navigationOptions: {
        title: '<3 chaz',
        headerStyle,
      }
    }

    const SomeStack = StackNavigator(RouteConfigs, StackNavigatorConfig)

    return <SomeStack />

  }

}

Chaz.contextTypes = {
  store: React.PropTypes.object.isRequired // Gives us store without @connect
};

export default Chaz;
