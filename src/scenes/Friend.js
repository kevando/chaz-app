import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AlertIOS,ScrollView,TextInput} from "react-native";
import {Actions} from "react-native-router-flux";
import * as recrActions from '../reducers/recr/actions';
import {connect} from 'react-redux';


class Friend extends Component {

  constructor(props) {
    super(props)

    var tmpRecr = this.props.recr;
    tmpRecr.stats = tmpRecr.stats || {}; // stats might not exist
    this.state = {recr:tmpRecr,name: tmpRecr.name}


  }


  render(){

    var {recr} = this.state;

    return (
      <View  style={styles.container}>
        <ScrollView>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <TextInput
                style={{height: 40, paddingLeft:0,fontSize:30}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                placeholder={"Name"}
                ref="NameInput"
                enablesReturnKeyAutomatically={true}
                returnKeyType={'done'}
                onSubmitEditing={this.onSaveNamePress.bind(this)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:20}}>{this.renderScore(recr)}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:15}}>Total Recommendations: {recr.stats.totalRecs}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}></View>
            <View style={styles.right}>
              <Text style={{fontSize:15}}>Graded Recommendations: {recr.stats.totalGradedRecs}</Text>
            </View>
          </View>


        </ScrollView>
      </View>
    );
  }
  renderScore(recr) {
    if(recr.stats.score)
      return "Score: " + recr.stats.score + "%"
    else
      return "No score yet";
  }

  onSaveNamePress() {
    // Might expand this as recr gets more data, but this works for now
    var newRecr = this.props.recr;
    newRecr.name = this.state.name;
    this.props.dispatch(recrActions.updateRecr(newRecr));

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    // backgroundColor:'#444',
    borderTopWidth: 2,
    flexDirection:'column'

    // borderTopColor: 'red'

  },
  row: {
    // backgroundColor: 'red',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // inner rows on top of each other
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5,

  },

  left: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  right: {
    flex:8,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor:'#fff',
    paddingLeft:5
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing:1.1
  },
  note: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '300',
    color: "#666",
    letterSpacing:1.0,
    marginTop:5
  }

});


function mapStateToProps(state) {
  return {
    // recs: this.recs,
    app: state.app
  };
}
export default connect(mapStateToProps)(Friend);
