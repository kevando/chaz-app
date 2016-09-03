import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Button from "react-native-button";
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';

import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';



class RecommenderAdd extends Component {
    constructor(props){
        super (props);
        this.state = {name: ''};
    }

    componentDidMount() {
      this.refs.RecrInput.focus(true);
     }


    componentWillReceiveProps(nextProps) {
      // This gets invoked after ADD_RECR
      // Now get user back to recView with their recr data
      if(this.props.recrs.size != nextProps.recrs.size){
        var recr = nextProps.recrs.last();
        this.onRecrAssignPress(recr)
      }

    }

    render(){
      var rec = this.props.passProps; // super weird way of doing this but whatever
        return (
          <View>
            <Text style={styles.title}>Who Recommended this?</Text>
            <TextInput
              style={{height: 40, paddingLeft:10,borderColor:'#ccc',borderWidth:1}}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
              placeholder={"Add a new person"}
              ref="RecrInput"
              enablesReturnKeyAutomatically={true}
              returnKeyType={'done'}
              onSubmitEditing={this.onAddRecrPress.bind(this)}
            />

            {this.renderRecrs()}

            <Button style={{color:'red',marginTop:20}} onPress={this.props.closeHandler}>Cancel</Button>
          </View>
        );
    }
    renderRecrs() {
      var recrs = this.props.recrs;
      if(recrs.size > 0){
        return (
          <View>
          <Text style={{marginTop:10,marginBottom:10}}>Or choose from existing friends:</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>

            {
              recrs.map(recr => (
                <Button style={{color:'green',fontWeight:'300',fontSize:14,textAlign:'center',borderColor:'#ccc',borderWidth:1,padding:6,margin:5}} key={recr.get('id')} onPress={this.onRecrAssignPress.bind(this,recr)} >{recr.get('name')}</Button>
              ))
            }
          </View>
          </View>
        )
      } // if
    }
    onRecrAssignPress(recr) {
      var rec = this.props.passProps;
      // console.log('recr in asign recr',recr);
      rec.recr_id = recr.get('id');
      this.props.dispatch(recActions.updateRec(rec));
      this.props.closeHandler();
    }
    onAddRecrPress() {
      this.refs.RecrInput.clear()
      this.props.dispatch(recrActions.addRecr(this.state.name));
    }
}

var styles = StyleSheet.create({
    title: {
      textAlign:'center',
      fontSize: 20,
      fontWeight: '500',
      marginBottom:15,
    }
});


function mapStateToProps(state) {
  return {
    recs: state.recs,
    recrs: state.recrs
  };
}
export default connect(mapStateToProps)(RecommenderAdd);
