import React, { Component } from 'react';
import ConfirmRecommendation from './ConfirmRecommendation';
import { Actions } from 'react-native-router-flux';

class ConfirmRecommendationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {showTitle: true}
  }

  componentWillMount() {
    if(!this.props.unfinished.title) {
      this.setState({showTitle: false});
    }
  }
  componentWillReceiveProps(nextProps) {
    // Not sure why this entire component re mounts..
    // console.log('confRec new props',nextProps)
    if(!nextProps.unfinished.title) {
      Actions.reset('MainStack')
    }
  }

  // seems to work differently now
  // componentDidMount() {
  //   // Not sure why this entire component re mounts..
  //   console.log('confRec did mount',this.props)
  //   if(!this.props.unfinished.title) {
  //     Actions.reset('MainStack')
  //   }
  // }

  _onSaveRecommendationPress() {
    const { addRecommendation, unfinished } = this.props;
    this.setState({showTitle: false});
    addRecommendation(unfinished); // Redux
  }

  render() {
    // console.log('confRec render',this.props)
    return (
      <ConfirmRecommendation
        onSaveRecommendationPress={this._onSaveRecommendationPress.bind(this)}
        {...this.props}
        {...this.state}
      />
    );
  }

}

export default ConfirmRecommendationContainer;
