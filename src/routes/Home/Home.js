import React from 'react';
import { Text, View, ScrollView, LayoutAnimation } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import * as Widget from '../../components/Widgets';

import * as Animatable from 'react-native-animatable';

class Home extends React.Component {

  render() {

    const { widgetData, onAddRecPress, dataReady, onRecrPress } = this.props;

    if(!dataReady)
      return <Loading text='Loading data' heart='blue' />

      return (
        <View style={styles.container}>
          <ScrollView>

            <Widget.Onboarding data={widgetData.onboarding} />
            <Widget.Recent     data={widgetData.recent} />
            <Widget.Categories data={widgetData.categories} />
            <Widget.All        data={widgetData.all} />
            <Widget.Help       data={widgetData.help} />

          </ScrollView>

          <Button text="Add Recommendation" onPress={onAddRecPress}/>

        </View>

      );

  }
}


export default Home;
