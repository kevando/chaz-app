import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import RecListItem from '../../components/RecListItem';
import { MeteorListView } from 'react-native-meteor';
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

     const { recsReady, onRecPress, selector } = this.props;


    if (!recsReady) {
      return <Loading />;
    }

    return (
      <View style={styles.container}>
      <View style={styles.sortContainer} >
        <TouchableOpacity onPress={this.updateSort.bind(this,'newest')}><Text style={[styles.sort,this.getStyle('newest')]}>Newest</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'oldest')}><Text style={[styles.sort,this.getStyle('oldest')]}>Oldest</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'bestOverall')}><Text style={[styles.sort,this.getStyle('bestOverall')]}>Best Overall</Text></TouchableOpacity>
        <TouchableOpacity onPress={this.updateSort.bind(this,'bestCategory')}><Text style={[styles.sort,this.getStyle('bestCategory')]}>Best TV</Text></TouchableOpacity>
      </View>
      <View style={styles.headerContainer} >
        <Text style={styles.title}>This is your list of unwatched TV shows</Text>

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
