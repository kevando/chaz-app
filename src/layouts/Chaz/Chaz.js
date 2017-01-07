import React from 'react';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
import styles from './styles';

class LoggedIn extends React.Component {

  render() {
    const sceneStyle = [];
    sceneStyle.push({ paddingTop: 64 });

    const initialStack = [Routes.getDashboardRoute()];


    // if(process.env.NODE_ENV == 'production')
    //   initialStack.push(Routes.getInitialRecInputRoute());

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

export default LoggedIn;
