import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import styles from './Styles';
import Cats from '../../lib/Categories';
import WidgetContainer from './WidgetContainer';
import TextItem from '../TextItem';
import NeedsCategory from './NeedsCategory';
import Rec from './Rec';

import * as Animatable from 'react-native-animatable';

export default class Categories extends Component {



  render() {

    const { recs, onPress,  } = this.props.data;

    const categories = _.groupBy(recs,'category');


    return(
      <View>

        {
          _.map(categories, (category,i) => {

            if(category.length > 2){
              return (
                <WidgetContainer icon={Cats[i].icon} title={i} key={i} onPress={onPress.bind(this,i)}>
                    <View style={styles.categoryContent}>
                    <Animatable.View ref='options'>


                    <View><Text>{category.length} Recommendations</Text></View>

                    </Animatable.View>

                    </View>
                </WidgetContainer>


              )
            }


          })
        }

      </View>
    )
  }







}
