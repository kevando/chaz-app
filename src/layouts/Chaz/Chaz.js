import React, {Component} from 'react';
import {View,Text,Button,Animated} from 'react-native';
// import { StackNavigator, Transitioner } from 'react-navigation';
import Routes, { RouteConfigs } from '../../config/routes';
import styles, {headerStyle} from './styles';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen }
});


class Chaz extends Component {

  componentDidMount() {
    // If this function grows, consider a initializeApp action
    // const { checkNotificationPermission } = this.props;
    // checkNotificationPermission();
  }


  render() {
    // return(<View><Text>dude</Text></View>)

    // return <SimpleApp />;

    // const store = this.context.store.getState();
    //
    const initialRoute =  'Dashboard'//store.recommendations.list.length == 0 ? 'Hello' : 'Dashboard';
    // // const initialRoute = 'ConfirmRecommendation';
    //
    // const StackNavigatorConfig = {}
    const StackNavigatorConfig = {
      initialRouteName: initialRoute,
      mode:'modal',
      navigationOptions: {
        title: '<3 chaz',
        // headerStyle,
      }
    }
    //
    const SomeStack = StackNavigator(RouteConfigs, StackNavigatorConfig)
    //
    return <SomeStack />

  }

}

// Chaz.contextTypes = {
//   store: React.PropTypes.object.isRequired // Gives us store without @connect
// };

export default Chaz;
