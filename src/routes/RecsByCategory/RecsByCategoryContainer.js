import React, { Component } from 'react';
import { Alert } from 'react-native';
import RecsByCategory from './RecsByCategory';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'



class RecsByCategoryContainer extends Component {

  componentWillMount() {
    this.state = {recsByCategory: {} };
  }

  // componentWillReceiveProps({recommendations}) {}
  // componentWillUpdate(nextProps, nextState){}
  // componentDidUpdate(prevProps, nextState){}


  componentWillMount() {
    const { myRecs } = this.props
    let recsByCategory = {}
    let categories = []

    const uniqueCategorRecs = _.uniqBy(myRecs,'category.id')

    _.forEach(uniqueCategorRecs, rec => {
      if(!rec.category) {return} // uncategorized
      recsByCategory[rec.category.title] = _.filter(myRecs, r => r.category.id == rec.category.id)

    })


    this.setState({recsByCategory})
  }



  render() {

      return (

        <RecsByCategory
          {...this.props}
          {...this.state}

        />
      )

  }
}

export default RecsByCategoryContainer;
