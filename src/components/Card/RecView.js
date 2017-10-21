import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import _ from 'lodash'
import { Actions} from 'react-native-router-flux';
import { Categories, CategoryIcon } from '../../components/Category/Icon';
import { colors } from '../../config/styles';
import styles from './styles';



class TitleCard extends Component {



render() {
  const { rec, onEditPress } = this.props;
  return (
    <View>
      <TouchableOpacity onPress={onEditPress} activeOpacity={0.9}>
        <View style={[styles.container]}>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
    <View>


    </View>

    </View>
  );
}


};


class FriendCard extends Component {

  render() {
    const { rec } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.iconContainer}>
          <Icon name='user' color={colors.green} size={25} />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.friend}</Text>
          </View>
        </View>
      </View>
    );
  }

};

class CategoryPicker extends Component {

  render() {
    const { rec, onCategoryPress } = this.props;
    return (
      <View style={styles.pickerContainer}>
        {
          _.map(Categories, (category,i) => {
            return (
              <View style={styles.categoryTouchable} key={i} >
              <TouchableOpacity onPress={() => onCategoryPress(rec,category)}>
              <View style={styles.textContainer}>
                <View style={styles.recContainer}>
                  <Text style={styles.categoryOptionText}><CategoryIcon category={category} size={16} color="blue" />&nbsp;{category.title}</Text>
                </View>
              </View>
              </TouchableOpacity>
              </View>
            )
          })
        }

      </View>
    );
  }

};

class CategoryCard extends Component {

  render() {
    const { rec } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.iconContainer}>
          <CategoryIcon category={rec.category} size={20}/>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.category.title}</Text>
          </View>
        </View>
      </View>
    );
  }

};



export {
  TitleCard,
  FriendCard,
  CategoryCard,
  CategoryPicker,
}
