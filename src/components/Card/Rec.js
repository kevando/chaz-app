import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';

import { colors } from '../../config/styles';
import styles from './styles';
import { CategoryIcon } from '../../components/Category/Icon';

class Card extends Component {

  _onCardPress() {
    if(this.props.unfinished) return; // dont allow expand if rec isnt saved
    Actions.push('RecView',{rec: this.props.rec})
  }

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (
    <View>
      <TouchableOpacity onPress={this._onCardPress.bind(this)} activeOpacity={0.9}>
        <View style={[styles.container]}>

          <View style={styles.iconContainer}>
            <CategoryIcon category={rec.category} size={25} color="grey" />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.recContainer}>
              <Text style={styles.recText}>{rec.title}</Text>
            </View>
            <View style={styles.friendContainer}>
              <Text style={styles.friendText}>Recommended by: {rec.friend ? rec.friend.name : 'Me'}</Text>
            </View>
          </View>

          <View style={styles.arrowContainer}>
            <Icon name="chevron-right" size={30} color="grey" />
          </View>

      </View>
    </TouchableOpacity>
    <View>

    </View>

    </View>
  );
}


};

export class ConfirmationCard extends Component {


render() {
  // console.log('conf',this.props)
  const { rec, friend } = this.props;

  // For some reason this reloads without data
  if(!friend) { return null }

  return (
    <View>
        <View style={[styles.container]}>

          <View style={styles.iconContainer}>
            <CategoryIcon category={rec.category} size={25} color="grey" />
          </View>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>
          <View style={styles.friendContainer}>
            <Text style={styles.friendText}>Recommended by:<Text style={styles.bold}>{friend.name}</Text></Text>
          </View>
        </View>

      </View>

    </View>
  );
}


};

export class PreviewCard extends Component {


render() {
  // console.log('conf',this.props)
  // const { rec, friend } = this.props;

  // For some reason this reloads without data
  // if(!friend) { return null }

  return (
    <View>
        <View style={[styles.container,styles.backgroundShadow]} >

          <View style={styles.iconContainer}>
            <CategoryIcon category={{icon:'music'}} size={25} color={"blue"}/>
          </View>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>Green Day</Text>
          </View>
          <View style={styles.friendContainer}>
            <Text style={styles.friendText}>Recommended by:<Text style={styles.bold}>Dad</Text></Text>
          </View>
        </View>

      </View>

    </View>
  );
}


};

export default Card;
