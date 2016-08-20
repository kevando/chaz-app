import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import Button from "react-native-button";
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';

import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
var {
  height: deviceHeight
} = Dimensions.get("window");

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
});

class RecommenderAdd extends Component {
    constructor(props){
        super (props);

        this.state = {
            offset: new Animated.Value(-deviceHeight),
            name: ''
        };
    }

    componentDidMount() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: 0
        }).start();
    }

    closeModal() {
        Animated.timing(this.state.offset, {
            duration: 150,
            toValue: -deviceHeight
        }).start(Actions.pop);
    }

    renderRecrs() {
      // console.log(this.props);
      var recrs = this.props.recrs;
      console.log(recrs);
      return (
        <View>
          {


            recrs.map(recr => (
              <Button key={recr.get('id')} onPress={this.onRecrAssignPress.bind(this,recr)} >{recr.get('name')}</Button>
            ))


          }
        </View>
      )
    }

    render(){
        return (
            <Animated.View style={[styles.container, {backgroundColor:"rgba(52,52,52,0.5)"},
                                  {transform: [{translateY: this.state.offset}]}]}>
                <View style={{  width:250,
                                height:250,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor:"white" }}>
                                <Text>Previous Recrs:</Text>
                                {this.renderRecrs()}
                                <Text>end Previous Recrs:</Text>
                    <TextInput
                      style={{height: 40, paddingLeft:10}}
                      onChangeText={(name) => this.setState({name})}
                      value={this.state.name}
                      placeholder={"Add a new person"}
                      ref="TitleInput"
                      enablesReturnKeyAutomatically={true}
                      returnKeyType={'done'}
                      onSubmitEditing={this.onAddRecrPress.bind(this)}
                    />
                    <Button onPress={this.closeModal.bind(this)}>Close</Button>
                </View>
            </Animated.View>
        );
    }
    onRecrAssignPress(recr) {
      console.log('assign this bitch',this.state);
      var rec = this.props.rec;
      this.props.dispatch(recActions.assignRecr(rec,recr));
    }
    onAddRecrPress() {
      console.log('state info',this.state);
      this.props.dispatch(recrActions.addRecr(this.state.name));
    }
}




function mapStateToProps(state) {
  return {
    recs: state.recs,
    recrs: state.recrs
  };
}
export default connect(mapStateToProps)(RecommenderAdd);
