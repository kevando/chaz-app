import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import * as Animatable from 'react-native-animatable';

class MovieQueue extends Component {

  constructor(props) {
    super(props);
    this.state = {size: this.props.data.recs.length}
  }

  componentDidUpdate(prevProps) {

    const { recs }  = this.props.data;
    const { size } = this.state;

    if(recs.length != size){
      // then user added a new rec here!
      this.setState({size:recs.length});
      this.refs.view.shake();
    }
  }

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <Animatable.View ref='view'>
          <WidgetContainer icon="vhs" title="Movies" >
            <TouchableOpacity onPress={onPress} >
              <View style={styles.widgetButton}>
                <Text>Your unwatched movie recommendations</Text>
              </View>
            </TouchableOpacity>
          </WidgetContainer>
        </Animatable.View>
      );
    } else {
      return <View></View>
    }
  }


}

export default MovieQueue;
