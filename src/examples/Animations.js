import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  LayoutAnimation
} from 'react-native';

import * as Animatable from 'react-native-animatable';



class Good extends Component {

  constructor(){
    super();
    this.state ={
      status:true
    }
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut(); // Slides into new position
  }

  onPress() {

    this.refs.good.fadeOutRight().then(this.end.bind(this));
  }

  onBringBackPress() {

    this.setState({status:true});
    // this.refs.good.fadeOutRight().then(this.end.bind(this));
  }

  end() {
    this.setState({status:false});
  }

  render() {

      return (
        <View>
        { this.state.status ?

          <Animatable.View style={styles.post} ref='good' >
            <Text style={styles.title} >Something I already believe</Text>
            <Text style={styles.button} onPress={this.onPress.bind(this)}>I Agree!</Text>
          </Animatable.View>

        : <View>
        <Text  onPress={this.onBringBackPress.bind(this)}>ish</Text>
        </View>


      }

        </View>

      );

  }


}



class Animations extends Component {


  componentDidMount() {

  }




  render() {

    Good = Animatable.createAnimatableComponent(Good);


      return (
        <View style={styles.container}>


          <ScrollView>

                <Good />
                <Good />
                <Good />
                <Good />




          </ScrollView>
        </View>

      );

  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    margin: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '500'
  },

  button: {
    backgroundColor:'blue',
    padding:12,
    color:'white',
    width:200,
    margin: 10
  }

})

export default Animations;
