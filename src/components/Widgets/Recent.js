import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import styles from './Styles';
import Categories from '../../lib/Categories';
import WidgetContainer from './WidgetContainer';
import TextItem from '../TextItem';
import NeedsCategory from './NeedsCategory';
import Rec from './Rec';

import * as Animatable from 'react-native-animatable';

export default class Recent extends Component {





  render() {

    const { recs, onRecrPress, onCategoryPress, onRecPress } = this.props.data;

    return(
      <View>

        {
          _.map(recs, (rec,i) => {

            if(i < 4){ // last 4 recs saved
              return (
                <Rec rec={rec} key={i} index={i} onRecPress={onRecPress} onCategoryPress={onCategoryPress} onRecrPress={onRecrPress} />

              )
            }

          })
        }

      </View>
    )
  }







}
