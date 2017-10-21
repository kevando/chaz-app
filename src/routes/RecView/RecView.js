import React from 'react';
import { View, Text, ScrollView, StatusBar, Button } from 'react-native';
import { TitleCard, FriendCard, CategoryCard, CategoryPicker  } from '../../components/Card/RecView'
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

const RecView = ({ rec, onEditPress, onDeletePress, onCategoryPress }) => {



  return (
    <View style={styles.container}>

      <Text style={styles.label}>Recommendation</Text>
      <TitleCard rec={rec} onEditPress={onEditPress}/>

      <Category rec={rec} onCategoryPress={onCategoryPress} />

      <Text style={styles.label}>Recommended by</Text>
      <FriendCard rec={rec} />


      <Button title="delete" onPress={onDeletePress} color="red" />

    </View>
  );
}

export default RecView;
