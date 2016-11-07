import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import Button from '../Button';
import TextItem from '../TextItem';
import Categories from '../../lib/Categories';
import * as Animatable from 'react-native-animatable';



export default class NeedsCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {category: this.props.rec.category}
  }

  componentDidUpdate(prevProps) {

    const { rec }  = this.props;
    const { category } = this.state;

    if(rec.category != category){
      // then user updated the category!
      this.setState({category:rec.category});
      this.refs.view.bounceInDown();
    }
  }



  render() {
    const { rec, onPress, title } = this.props;

    return (
      <Animatable.View ref='view'>


        <TouchableOpacity onPress={onPress.bind(this,rec)} style={styles.listItem}  >
        {rec.category == 'uncategorized' ?
          <TextItem title='Categorize this' icon={'writing_hand'} />
        :
          <TextItem title={`Categorized as ${rec.category}!`}  icon='white_check_mark' />
        }

        </TouchableOpacity>

        </Animatable.View>
    );
  }
}
