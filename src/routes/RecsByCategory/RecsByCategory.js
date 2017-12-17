import React from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import _ from 'lodash';
import { Button, Title, Container } from '../../components/Generic';
import { Card } from '../../components/Rec'
// import Filter from '../../components/Nav/Filter';

// import * as Onboarding from '../../components/Onboarding'
import styles from './styles';

// import Party from '../../components/Party'

const RecsByCategory = (props) => {
  // console.log('RecsByCategory.js', props)
  const { recsByCategory } = props;



  return (
    <View style={{flex: 1}}>
    <Container>
      <StatusBar barStyle="light-content" hidden={false} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>




      {
        _.map(recsByCategory,function(recs,category) {
          return(
            <View key={category}>
              <Title header>{category}</Title>
              {
                _.map(recs,(rec,i) => <Card rec={rec} key={i} listItem  />)
              }
              </View>
          )
        })
      }


      </ScrollView>



    </Container>
    </View>
  );
}
// <AppSettings {...props} />
export default RecsByCategory;
