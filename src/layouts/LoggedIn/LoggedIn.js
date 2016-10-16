import React from 'react';
// import { Image } from 'react-native';
// import TabNavigator from 'react-native-tab-navigator';
import ExNavigator from '@exponent/react-native-navigator';
import Routes from '../../config/routes';
// import images from '../../config/images';
import styles from './styles';

class LoggedIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Recs', // Initial Route
    };
  }

  render() {
    const sceneStyle = [];
    sceneStyle.push({ paddingTop: 64 });

    const initialStack = [Routes.getHomeRoute()];

    // For development, just load the widgets screen
    // Dont default to the Add Rec form
    // if(process.env.NODE_ENV == 'production')
      initialStack.push(Routes.getInitialRecInputRoute());

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

  // renderTabItem(title, initialRoute, Icon) {
  //   const { selectedTab } = this.state;
  //   const sceneStyle = [];
  //   if (initialRoute.showNavigationBar !== false) {
  //     sceneStyle.push({ paddingTop: 64 });
  //   }
  //
  //
  //   return (
  //     <TabNavigator.Item
  //       selected={selectedTab === title}
  //       title={title}
  //       renderIcon={() => <Image style={styles.icon} source={Icon} />}
  //       renderSelectedIcon={() => (
  //         <Image
  //           style={[styles.icon, styles.iconSelected]}
  //           source={Icon}
  //         />
  //       )}
  //       onPress={() => this.setState({ selectedTab: title })}
  //     >
  //       <ExNavigator
  //         initialRoute={initialRoute}
  //         style={{ flex: 1 }}
  //         sceneStyle={sceneStyle}
  //         showNavigationBar={initialRoute.showNavigationBar}
  //       />
  //     </TabNavigator.Item>
  //   );
  // }
  //
  // render_tabs() {
  //   return (
  //     <TabNavigator>
  //       {this.renderTabItem('Home', Routes.getHomeRoute(), images.icons.home)}
  //       {this.renderTabItem('Recs', Routes.getRecsRoute(), images.icons.home)}
  //       {this.renderTabItem('Recrs', Routes.getRecrsRoute(), images.icons.profile)}
  //       {this.renderTabItem('Categories', Routes.getCategoriesRoute(), images.icons.home)}
  //       {this.renderTabItem('Profile', Routes.getProfileRoute(), images.icons.profile)}
  //     </TabNavigator>
  //   );
  // }

}

export default LoggedIn;
