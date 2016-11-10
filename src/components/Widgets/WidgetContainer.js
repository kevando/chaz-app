import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Emoji from 'react-native-emoji';


import * as Animatable from 'react-native-animatable';


class WidgetContainer extends React.Component {

  componentDidMount() {

    const { title, index } = this.props
    if(index == 0){
      // This condition means the first rec is added!
      this.refs.widget.bounceIn();
    }
  }

  componentWillUpdate(nextProps){

    const { title, index } = this.props

    if(nextProps.title != title && index == 0){
      // This condition means this is a newly added rec!
      this.refs.widget.bounceIn();
    }

    if(nextProps.recr_id && nextProps.category != 'uncategorized'){
      // This condition means this is a newly added rec!
      // this.refs.widget.bounceOut();
      alert('asdf');
    }
  }

  render() {

    const { icon, title, children, onPress } = this.props


    return (
      <TouchableOpacity onPress={onPress} >
        <Animatable.View ref='widget' >
        <View style={styles.container}>

            <View style={styles.titleContainer}>
              <View style={styles.titleLeft}>
                <Text style={styles.icon}><Emoji name={icon} /></Text>
              </View>
              <View style={styles.titleRight}>
                <Text style={styles.title}>{title}</Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              {children}
            </View>

        </View>

        </Animatable.View>
      </TouchableOpacity>

    );
  }
};


export default WidgetContainer;
