import React from 'react';
import { View, Text, StyleSheet, Platform, Image, AlertIOS } from 'react-native';
// import _ from 'lodash'
import firebase from 'react-native-firebase';

// import { Container, Header, Title, Content, List, ListItem, Text, Left, Right, Body, Button } from 'native-base';


// console.ignoredYellowBox = ['Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).'];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      foods: [],
    };
  }

  componentDidMount() {
    this._fetchFoods()
  }

  _fetchFoods() {
    console.log('fretch humans')
    firebase.firestore()
    .collection('humans')
    .get()
    .then(querySnapshot => {
      console.log('humans!')
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        console.log(doc.data())
        // let food = doc.data()
        // food._id = doc.id
        // foodsList.push(doc.data())
      })
      // this.setState({foods: foodsList})
    })
  }

  // _saveFood = (food) => {
  //   firebase.firestore()
  //   .collection('foods')
  //   .add({
  //     name: food,
  //     count: 1,
  //   })
  //   .then(() => this._fetchFoods())
  // }
  //
  // _onAddPress = () => {
  //   AlertIOS.prompt(
  //     'Enter a food', null,
  //     text => this._saveFood(text)
  //   )
  // }
  //
  // _onIncrementPress = ({_id, count}) => {
  //   firebase.firestore()
  //   .collection('foods')
  //   .doc(_id)
  //   .update({count: ++count})
  //   .then(() => this._fetchFoods())
  // }

  render() {
    // console.log(this.state)
    return (
      <View>
        <Text>DUDE</Text>
      </View>
    );
  }
}
//
// const FoodList = ({ foods, onPress }) => {
//
//   let ListItems = _.map(foods, (food,i) => {
//     return(
//       <ListItem icon key={i}>
//         <Left><Text>{food.count}</Text></Left>
//         <Body><Text>{food.name}</Text></Body>
//         <Right><Button small onPress={() => onPress(food)}>
//             <Text>+</Text>
//           </Button></Right>
//       </ListItem>
//     )
//
//   })
//   return (<List>{ListItems}</List>)
// }
