import React from 'react';
import { Text, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import RecrSelection from '../../components/RecrSelection';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import styles from './styles';

import Meteor, { MeteorListView } from 'react-native-meteor';


const RecrInput = (props) => {
  const { updateState, onSelect, addRecr, assignRecr, name, recr } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerText}>Assign Recr</Text>
      </View>

      <InputWrapper>
        <GenericTextInput
          placeholder="Who recd??"
          value={name}
          onChangeText={(name) => updateState({ name })}
        />

        <View style={styles.buttons}>
          <Button text="Add Recr" onPress={addRecr} />
        </View>

      </InputWrapper>

      <View style={styles.buttons}>
        <Button text="Assign Recr" onPress={assignRecr} />
      </View>

      <RecrSelection onSelect={(recr) => updateState({ recr })} recr={recr} />




      <KeyboardSpacer />
    </View>
  );
};

RecrInput.propTypes = {
  updateState: React.PropTypes.func,
  addRecr: React.PropTypes.func,
  assignRecr: React.PropTypes.func,
};

export default RecrInput;
