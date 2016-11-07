import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import styles from './Styles';
import Categories from '../../lib/Categories';
import WidgetContainer from './WidgetContainer';
import TextItem from '../TextItem';
import NeedsCategory from './NeedsCategory';
import NeedsRecr from './NeedsRecr';

export default class NeedsData extends Component {

  render() {

    const { recs, onRecrPress, onCategoryPress } = this.props.data;
    
    return(
      <View>
      {
        _.map(recs, (rec,i) => {

          const icon = rec.category == 'uncategorized' ? 'no_entry' : Categories[rec.category].icon;

          return (

            <WidgetContainer icon={icon} title={rec.title} key={i} >
                <View style={styles.widgetButton}>
                  <NeedsCategory rec={rec} onPress={onCategoryPress} />
                  <NeedsRecr rec={rec} onPress={onRecrPress} />
                </View>
            </WidgetContainer>
          )
        })
      }

      </View>
    )
  }








  render_og() {
    const { recs, onPress } = this.props.data;

    if(recs.length < 1 )
      return (<View></View>);

    return (
      <WidgetContainer icon="no_mouth" title="Who recommended these?" >
        <View style={{flex: 1}}>
        {
          _.map(recs, (rec, i) => {
          return (
            <TouchableOpacity key={i} onPress={onPress.bind(this,rec)} style={styles.listItem}>
              <TextItem title={rec.title} note={rec.note} icon={Categories[rec.category].icon} />
              </TouchableOpacity>
            );
          })
        }
        </View>
      </WidgetContainer>
    );
  }
}
