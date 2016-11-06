import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import * as Widget from '../../components/Widgets';

const Home = (props) => {

  const { widgetData, onAddRecPress, dataReady, onRecrPress } = props;

  if(!dataReady)
    return <Loading text='Loading data' heart='blue' />

  return (
    <View style={styles.container}>
      <ScrollView>
        <Widget.Welcome       data={widgetData.welcome} />

        <Widget.Uncategorized data={widgetData.uncategorized} />
        <Widget.NeedsRecr     data={widgetData.needsRecr} />

        <Widget.MovieQueue    data={widgetData.movieQueue} />
        <Widget.Tv            data={widgetData.tv} />

        <Widget.TopFriends    data={widgetData.topFriends} />

        <Widget.MusicQueue    data={widgetData.musicQueue} />
        <Widget.BookQueue     data={widgetData.bookQueue} />
        <Widget.PodcastQueue  data={widgetData.podcastQueue} />
        <Widget.FoodQueue     data={widgetData.foodQueue} />
        <Widget.PlaceQueue    data={widgetData.placeQueue} />
        <Widget.Queue         data={widgetData.queue} />

        <Widget.Help          data={widgetData.help} />

      </ScrollView>
      <Button text="Add Recommendation" onPress={onAddRecPress}/>
    </View>

  );
};

export default Home;
