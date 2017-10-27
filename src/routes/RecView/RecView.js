import React from 'react';
import { View, Text, ScrollView, StatusBar, Button } from 'react-native';
import { TitleCard, FriendCard, CategoryCard, CategoryPicker, ReminderCard  } from '../../components/Card/RecView'
import styles from './styles';


const Category = ({ rec, onCategoryPress }) => {

  if(!rec.category || rec.category == 'uncategorized')  {
    return (
      <View>
      <Text style={styles.label}>Pick a Category</Text>
      <CategoryPicker rec={rec} onCategoryPress={onCategoryPress} />
      </View>
    )
  } else {
    return (
      <View>
      <Text style={styles.label}>Category</Text>
      <CategoryCard rec={rec} />
      </View>
    )
  }

}

const RecView = ({ rec, app, onEditPress, onDeletePress, onCategoryPress, updateRecommendation,onAssignPress }) => {

  // console.log('RecView',rec)


  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>Recommendation</Text>
      <TitleCard rec={rec} onEditPress={onEditPress}/>

      <Category rec={rec} onCategoryPress={onCategoryPress} />

      <Text style={styles.label}>Recommended by</Text>
      <FriendCard friend={rec.friend} />

      <Text style={styles.label}>Follow Up</Text>
      <ReminderCard rec={rec} updateRecommendation={updateRecommendation} app={app}/>

      <View style={{marginTop:200}}>
        <Button title="delete" onPress={onDeletePress} color="red" />
      </View>

    </ScrollView>
  );
}

export default RecView;
