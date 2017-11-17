import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button, Title, Container } from '../../components/Generic';
import { Card } from '../../components/Rec'
import Filter from '../../components/Nav/Filter';

import * as Onboarding from '../../components/Onboarding'
import styles from './styles';

import Party from '../../components/Party'

const Dashboard = (props) => {
  // console.log('Dashboard.js', props)
  const { myRecs, onNewRecPress, onNewGivenRecPress, activeFilter, changeActiveFilter, givenRecs } = props;


  const filteredRecs = myRecs// TMP UI!! activeFilter === 'Everything' ? myRecs : _.filter(myRecs, function(rec) { return rec.category.title == activeFilter; });


  return (
    <View style={{flex: 1}}>
    <Container>
      <StatusBar barStyle="light-content" hidden={false} />
      {myRecs.length == 1 && <Party partySize='big' delay={1000} />}
      <ScrollView style={styles.scrollView}>
        <Title header>chaz</Title>

        <Onboarding.NoRecs {...props} />

        {myRecs.length > 16 && <Filter activeFilter={activeFilter} changeActiveFilter={changeActiveFilter} />}


      {
        _.map(filteredRecs,function(rec,i) {
          return(
            <Card rec={rec} key={i} listItem />
          )
        })
      }


      </ScrollView>



    </Container>
<Button text="New Recommendation" onPress={onNewRecPress} />
    </View>
  );
}
// <AppSettings {...props} />
export default Dashboard;
