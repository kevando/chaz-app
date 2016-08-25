import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Dimensions,
} from 'react-native';
import Button from "react-native-button";
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';

import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
var {
  height: deviceHeight
} = Dimensions.get("window");



class RecommenderAdd extends Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(deviceHeight),
            name: ''
        };
    }

    componentDidMount() {
      this.refs.RecrInput.focus(true);
        Animated.timing(this.state.offset, {
            duration: 250,
            toValue: 0
        }).start();
    }

    componentWillReceiveProps(nextProps) {
      // This gets invoked after ADD_RECR
      // Now get user back to recView with their recr data
      console.log('props came back in recrAdd');
      console.log(this.props.recrs.size)
      console.log(nextProps.recrs.size)
      if(this.props.recrs.size != nextProps.recrs.size){
          console.log('a NEW recr was added, so assign it and close out',recr)
          var recr = nextProps.recrs.last();
          this.onRecrAssignPress(recr)
      }

    }

    closeModal() {
      Animated.timing(this.state.offset, {
          duration: 150,
          delay:10,
          toValue: deviceHeight
      }).start(Actions.pop);
    }



    render(){
        return (
            <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"}, {transform: [{translateY: this.state.offset}]}]}>
                <View style={styles.popupContainer}>
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
                  <Text>Choose from existing friends:</Text>
                  {this.renderRecrs()}
                    <Button onPress={this.closeModal.bind(this)} style={{marginTop:20}}>Cancel</Button>
                </View>
                <KeyboardSpacer/>
            </Animated.View>
        );
    }
    renderRecrs() {
      // console.log(this.props);
      var recrs = this.props.recrs;
      // console.log(recrs);
      return (
        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
          {
            recrs.map(recr => (
              <Button style={{color:'green',fontWeight:'600',textAlign:'left',borderColor:'green',borderWidth:2,padding:6,margin:5}} key={recr.get('id')} onPress={this.onRecrAssignPress.bind(this,recr)} >{recr.get('name')}</Button>
            ))
          }
        </View>
      )
    }
    onRecrAssignPress(recr) {
      console.log('assign this bitch',this.state);
      var rec = this.props.rec;
      this.props.dispatch(recActions.assignRecr(rec,recr));
      this.closeModal()
    }
    onAddRecrPress() {
      // console.log('state info',this.state);
      this.refs.RecrInput.clear()
      this.props.dispatch(recrActions.addRecr(this.state.name));
    }
}

var styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:"transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    popupContainer: {
      width:300,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"white",
      borderWidth:5,
      padding:10,
      borderColor: 'green'
    }
});


function mapStateToProps(state) {
  return {
    recs: state.recs,
    recrs: state.recrs
  };
}
export default connect(mapStateToProps)(RecommenderAdd);
