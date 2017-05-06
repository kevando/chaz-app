import React, {Component} from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

class Chaz extends Component {

  componentDidMount() {
    // If this function grows, consider a initializeApp action
    const { checkNotificationPermission } = this.props;
    checkNotificationPermission();
  }

  render() {

    const store = this.context.store.getState();
    // const initialStack = [Routes.getDebugRoute()];
    const initialStack = [Routes.getDashboardRoute()];

    // Show welcome screen if there are no recs
    if(store.recommendations.list.length == 0)
      initialStack.push(Routes.getHelloRoute());
    // else
    //   initialStack.push(Routes.getNewRecommendationRoute());


    // if(process.env.NODE_ENV == 'production')
    //   initialStack.push(Routes.getInitialRecInputRoute());

    return (
      <ExNavigator
        initialRouteStack={initialStack}
        style={{ flex: 1 }}
        navigationBarStyle={styles.navBar}
        sceneStyle={{ paddingTop: 64 }}
      />
    );
  }

}

Chaz.contextTypes = {
  store: React.PropTypes.object.isRequired // Gives us store without @connect
};

export default Chaz;
