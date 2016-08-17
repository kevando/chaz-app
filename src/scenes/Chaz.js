
import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  // Text,
  // View,
} from 'react-native';

import {
  // Scene,
  Reducer,
  Router,
  Switch,
  // Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import {Scenes} from './SceneList';


const Right = () => (
  <Text
    style={{
      width: 80,
      height: 37,
      position: 'absolute',
      bottom: 4,
      right: 2,
      padding: 8,
    }}
  >Right</Text>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('%c ROUTER STATE:', 'color: green',state);
    console.log('%c ROUTER ACTION:', 'color: green',action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};



class Chaz extends Component {

  constructor(props) {
    super(props);
    // Set initial route (not sure if this is ok)
    const { initialRoute } = this.props;
    Scenes[initialRoute].initial = true;
  }

  render() {

    return (
      <Router
        createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        scenes={Scenes}
      />
    );
  }
}


export default Chaz;
