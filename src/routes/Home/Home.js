import React from 'react';
import { Text, View, ScrollView, LayoutAnimation } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import * as Widget from '../../components/Widgets';

import * as Animatable from 'react-native-animatable';

// const Home = (props) => {
class Home extends React.Component {


  // componentDidMount() {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); // this fades in
  // }

  // componentWillUpdate() {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); // this springs on position changes
  // }


  render() {

    const { widgetData, onAddRecPress, dataReady, onRecrPress } = this.props;

    if(!dataReady)
      return <Loading text='Loading data' heart='blue' />

      return (
        <View style={styles.container}>


          <ScrollView>

                <Widget.Recent     data={widgetData.recent} />


          </ScrollView>
          <Button text="Add Recommendation" onPress={onAddRecPress}/>
        </View>

      );

  }
}
//
// <ScrollView>
//
//       <Widget.Onboarding    data={widgetData.onboarding} />
//
//
//       <Widget.NeedsData     data={widgetData.needsData} />
//
//       <Widget.Tv            data={widgetData.tv} />
//
//       <Widget.MovieQueue    data={widgetData.movieQueue} />
//
//       <Widget.TopFriends    data={widgetData.topFriends} />
//
//       <Widget.MusicQueue    data={widgetData.musicQueue} />
//       <Widget.BookQueue     data={widgetData.bookQueue} />
//       <Widget.PodcastQueue  data={widgetData.podcastQueue} />
//       <Widget.FoodQueue     data={widgetData.foodQueue} />
//       <Widget.PlaceQueue    data={widgetData.placeQueue} />
//       <Widget.Queue         data={widgetData.queue} />
//
//       <Widget.Help          data={widgetData.help} />
//
//
// </ScrollView>



export default Home;
