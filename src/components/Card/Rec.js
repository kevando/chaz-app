import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';

import { colors } from '../../config/styles';
import styles from './styles';
import { CategoryIcon } from '../../components/Category/Icon';
import * as Friend from '../../components/Generic/Friend';
import * as Rec from '../../components/Generic/Rec'


// ---------------------------------------
// Abstract to a super generic card
// ---------------------------------------

class GenericCard extends Component {

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (

        <View style={[styles.container,styles.waterBackdrop]}>

          <View style={styles.headerContainer}>
            <View style={styles.friendContainer}>
              <Friend.Name friend={rec.friend} />
            </View>
            <View style={styles.iconContainer}>

            </View>
          </View>
          <View style={styles.bodyContainer}>
              <Rec.Title rec={rec} />
            </View>
        </View>



  );
}
}

// ---------------------------------------
// Use abstracted card
// ---------------------------------------

export class RecListItem extends Component {

  _onCardPress() {
    if(this.props.unfinished) return; // dont allow expand if rec isnt saved
    Actions.push('RecView',{rec: this.props.rec})
  }

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (

    <TouchableOpacity onPress={this._onCardPress.bind(this)} activeOpacity={0.9}>
        <GenericCard rec={rec} />

      </TouchableOpacity>

  );
}
//
// <View style={styles.iconContainer}>
//   <CategoryIcon category={rec.category} size={25} color="grey" />
// </View>
//
// <View style={styles.textContainer}>
//   <View style={styles.recContainer}>
//     <Text style={styles.recText}>{rec.title}</Text>
//   </View>
//   <View style={styles.friendContainer}>
//     <Text style={styles.friendText}>Recommended by: {rec.friend ? rec.friend.name : 'Me'}</Text>
//   </View>
// </View>

};

export class ConfirmationCard extends Component {


render() {
  // console.log('conf',this.props)
  const { rec, friend } = this.props;

  // For some reason this reloads without data
  if(!friend) { return null }


  return (
    <View style={[styles.container]}>

      <View style={styles.bodyContainer}>
       <View style={styles.iconContainer}>
        <CategoryIcon category={rec.category} size={30} color="grey" />
      </View>
      <View style={styles.textContainer}>
      <Text style={styles.headerText}>
        <Text style={styles.bold}>{friend ? friend.name : 'Me?'}</Text>
         &nbsp;Recommended
      </Text>
        <View style={styles.recContainer}>
          <Text style={styles.recText}>{rec.title}</Text>
        </View>

      </View>

      </View>





    </View>
  );
}


};

export class PreviewCard extends Component {


render() {
  return (


        <View style={[styles.container]}>


          <View style={styles.headerContainer}>
            <Text style={[styles.headerText,{color: 'white'}]}>
              <Text style={styles.bold}>Dad</Text>
               &nbsp;Recommended
            </Text>
          </View>

          <View style={[styles.bodyContainer,{paddingHorizontal:10}]}>
           <View style={[styles.iconContainer]}>
            <CategoryIcon category={{icon:'music'}} size={25} color={"blue"}/>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.recContainer}>
              <Text style={styles.recText}>Pinkfloyd dark side of the moon</Text>
            </View>

          </View>

          </View>





      </View>


  );


}


};
