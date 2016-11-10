import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  // LayoutAnimation,
 } from 'react-native';

import styles from './Styles';
import Categories from '../../lib/Categories';
import WidgetContainer from './WidgetContainer';
import NeedsCategory from './NeedsCategory';
import NeedsRecr from './NeedsRecr';

import * as Animatable from 'react-native-animatable';
import timer from 'react-native-timer';

export default class Rec extends Component {

  constructor(props) {
    super(props);
    this.state = {showOptions: false}
  }

  componentDidMount() {
    // Show options on initial mount if data isnt all set
    const { rec }  = this.props;
    const { showOptions } = this.state;
    if((!rec.recr_id || rec.category == 'uncategorized')){
      this.setState({showOptions: true});
    }
  }
  componentWillReceiveProps(nextProps) {

    const { rec }  = nextProps;
    // const { showOptions } = this.state;


    if((!rec.recr_id || rec.category == 'uncategorized')){
      this.setState({showOptions: true});
    } else {
      this.setState({showOptions: false});
      // animating this is being a bitch
    }

  }


  render() {

    const { rec, index, onRecrPress, onCategoryPress } = this.props;
    const { showOptions } = this.state;

    const icon = rec.category == 'uncategorized' ? 'no_entry' : Categories[rec.category].icon;

    return(

      <WidgetContainer icon={icon} title={rec.title} index={index}>
          <View style={styles.widgetButton}>
          <Animatable.View ref='options'>
          { !showOptions ?

          <View><Text>Recommended by {rec.recr.name}</Text></View>

          :
          <View>
          <NeedsCategory rec={rec} onPress={onCategoryPress} />
          <NeedsRecr rec={rec} onPress={onRecrPress} />
          </View>
          }
          </Animatable.View>

          </View>
      </WidgetContainer>

    )
  }


}
