import React from 'react';
import { Text, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import images from '../../config/images';
import styles from './styles';

const RecInput = (props) => {
  const { updateState, addRec, error, confirmPasswordVisible } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerText}>Add Rec</Text>
      </View>

      <InputWrapper>
        <GenericTextInput
          placeholder="add rec title"
          onChangeText={(title) => updateState({ title })}
        />

        <Text style={styles.errorText}>{error}</Text>

      </InputWrapper>

      <View style={styles.error}>
        <Text style={styles.errorText}>{error}</Text>
      </View>

      <View style={styles.buttons}>
        <Button text="Add Rec" onPress={addRec} />
      </View>

      <KeyboardSpacer />
    </View>
  );
};

RecInput.propTypes = {
  updateState: React.PropTypes.func,
  addRec: React.PropTypes.func,
  error: React.PropTypes.string,
};

export default RecInput;
