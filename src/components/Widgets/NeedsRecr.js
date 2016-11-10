import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import Button from '../Button';
import TextItem from '../TextItem';
import Categories from '../../lib/Categories';
import * as Animatable from 'react-native-animatable';



export default class NeedsRecr extends Component {

  constructor(props) {
    super(props);
    this.state = {recr_id: this.props.rec.recr_id}
  }


  componentDidUpdate(prevProps) {

    const { rec }  = this.props;
    const { recr_id } = this.state;

    if(rec.recr_id && !recr_id){
      // then user updated the recr!
      this.setState({recr_id:rec.recr_id});
      this.refs.view.bounceIn();
    }
  }

  render() {
    const { rec, onPress, title } = this.props;

    return (
      <Animatable.View ref='view'>


        <TouchableOpacity onPress={onPress.bind(this,rec)} style={styles.listItem}  >
        {!rec.recr_id ?
          <TextItem title='Who recommended this?' icon={'writing_hand'} />
        :
          <TextItem title={`Recommended by ${rec.recr.name}!`}  icon='white_check_mark' />
        }

        </TouchableOpacity>

        </Animatable.View>
    );
  }
}
