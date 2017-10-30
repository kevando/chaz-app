import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as Animatable from 'react-native-animatable';
import { colors, text } from '../../config/styles';

const Loading = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loading</Text>
    </View>
  );
}

export default Loading;



const styles = StyleSheet.create({

  container: {
    flex: 1,
    // backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...text,
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing:4,
    marginBottom: 20,
    marginHorizontal: 20,
  },

});




// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
//
// import LoggedOut from './LoggedOut';
// import * as AppActions from '../../reducers/app/actions';
//
// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//     app: state.app,
//   };
// };
//
// export default connect(mapStateToProps, null)(LoggedOut);
