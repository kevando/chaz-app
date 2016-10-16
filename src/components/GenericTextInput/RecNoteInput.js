import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const RecNoteInput = (props) => {
  return (
    <View>
      {props.borderTop ? <View style={styles.divider} /> : null}
      <TextInput
        placeholder="Write a note"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
    </View>
  );
};

RecNoteInput.propTypes = {
  borderTop: React.PropTypes.bool,
};

export default RecNoteInput;
