import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

class RecTitleInput extends React.Component {

  componentDidMount() {
    // User is adding a new Rec, auto load the keyboard
    this.refs.TitleInput.focus(true);
  }

  render(){
    return (
      <View>
        {this.props.borderTop ? <View style={styles.divider} /> : null}
        <TextInput
          style={styles.input}
          placeholder="What is being recommended?"
          autoCapitalize="none"
          ref="TitleInput"
          autoCorrect={false}
          {...this.props}

        />
      </View>
    );
  }
};

RecTitleInput.propTypes = {
  borderTop: React.PropTypes.bool,
};

export default RecTitleInput;
