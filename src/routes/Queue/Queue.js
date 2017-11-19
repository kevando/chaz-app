import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button, Title, Container } from '../../components/Generic';
import { Card } from '../../components/Rec'
// import Filter from '../../components/Nav/Filter';

// import * as Onboarding from '../../components/Onboarding'
import styles from './styles';

// import Party from '../../components/Party'

const Queue = (props) => {
  // console.log('Queue.js', props)
  const { myQueue } = props;

  const orderedQueue = _.orderBy(myQueue,['reminder'],['desc'])
  return (

    <Container>
      <StatusBar barStyle="light-content" hidden={false} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Title header>Queue</Title>

      {
        _.map(orderedQueue,(rec,i) => {
          return( <Card rec={rec} key={i} listItem totalRecs={myQueue.length} />)
        })
      }

      </ScrollView>

    </Container>

  );
}

export default Queue;
