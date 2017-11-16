import React, { Component } from 'react';
import { View ,Text, TouchableOpacity} from 'react-native';
import _ from 'lodash'



export const NoRecs = (props) => {

  if(props.myRecs && props.myRecs.length == 0) {
    return (
      <TouchableOpacity  onPress={props.goToOnboarding}>
      <Text style={{textAlign: 'center', backgroundColor: 'white',paddingHorizontal: 10,paddingVertical: 10,margin: 10,}}>*** Do Onboarding Again ***</Text>
      </TouchableOpacity>
    )
  } else {
    return null
  }

}
