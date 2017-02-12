import React, {Component} from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

class Chaz extends Component {

  render() {
    const sceneStyle = [];
    sceneStyle.push({ paddingTop: 64 });

    const store = this.context.store.getState();
    const initialStack = [Routes.getDashboardRoute()];

    // @bug this does not bring up the AddRec as much as I would like
    if(store.recommendations.list.length == 0)
      initialStack.push(Routes.getHelloRoute());
    else
      initialStack.push(Routes.getNewRecommendationRoute());


    // if(process.env.NODE_ENV == 'production')
    //   initialStack.push(Routes.getInitialRecInputRoute());



    // Testing
    // initialStack.push(Routes.getDebugRoute());


    return (
      <ExNavigator
        initialRouteStack={initialStack}
        style={{ flex: 1 }}
        navigationBarStyle={styles.navBar}
        sceneStyle={sceneStyle}
        showNavigationBar={true}
      />
    );
  }

}

Chaz.contextTypes = {
  store: React.PropTypes.object.isRequired // Gives us store without @connect
};

export default Chaz;
