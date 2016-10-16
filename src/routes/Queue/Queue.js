import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import RecListItem from '../../components/RecListItem';
import Emoji from 'react-native-emoji';
import RecCategory from '../../components/RecCategory';
import Loading from '../../components/Loading';
import styles from './styles';



class Queue extends Component {

  constructor(props){
    super(props);
    this.state = {recs:this.props.recs['newest'],sort:'newest' }
  }

  updateSort(sort) {
    this.setState({recs: this.props.recs[sort],sort:sort})
  }

  getStyle(sort){
    if(sort == this.state.sort)
      return styles.activeSort
  }
  render(){

     const { recsReady, onRecPress, selector, category } = this.props;


    if (!recsReady) {
      return <Loading message="Loading Queue" />;
    }

    return (
      <View style={styles.container}>
      <View style={styles.sortContainer} >
        <TouchableOpacity onPress={this.updateSort.bind(this,'newest')}><Text style={[styles.sort,this.getStyle('newest')]}><Emoji name="new" />Newest</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'oldest')}><Text style={[styles.sort,this.getStyle('oldest')]}><Emoji name="coffin" />Oldest</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'bestOverall')}><Text style={[styles.sort,this.getStyle('bestOverall')]}><Emoji name="earth_americas" />Best</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'bestCategory')}><Text style={[styles.sort,this.getStyle('bestCategory')]}><RecCategory category={category} />Best</Text></TouchableOpacity>
      </View>
      <View style={styles.headerContainer} >
        <Text style={styles.title}></Text>

      </View>

      <ScrollView style={styles.recsContainer} >
        { this.renderRecs() }

      </ScrollView>

  </View>

    );
  }
  renderRecs() {
    const {onRecPress} = this.props;
    const { recs } = this.state
    var displayRecs = [];

    for(rec of recs){
      displayRecs.push(<RecListItem key={rec._id} rec={rec} onPress={ () => onRecPress(rec) }/>);
    }
    return displayRecs;
  }

};

Queue.propTypes = {
  recsReady: PropTypes.bool,
  onRecPress: PropTypes.func,
  recs: PropTypes.object,
};

export default Queue;
