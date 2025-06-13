import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Transaction } from '../types/models';

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  pickerContainer: {
    minHeight: 120,
    paddingVertical: 8,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    marginTop: -5,
    gap: 0,
  },
  picker: {
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    marginTop: 0,
    marginBottom: 0,
    justifyContent: 'center',
  },
  doneButton: {
    marginTop: 10,
    marginBottom: 4,
    width: '60%',
    alignSelf: 'center',
  },
});

const TypePickerComponent = ({ form, setForm, showTypePicker, setShowTypePicker }: { form: Partial<Transaction>; setForm: React.Dispatch<React.SetStateAction<Partial<Transaction>>>; showTypePicker: boolean; setShowTypePicker: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <>
      <Button
        mode="outlined"
        onPress={() => setShowTypePicker(!showTypePicker)}
        style={styles.input}
      >
        {form.type ? `Type: ${form.type}` : 'Select type'}
      </Button>
      {showTypePicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.type}
            onValueChange={value => setForm((f: Partial<Transaction>) => ({ ...f, type: value as Transaction['type'] }))}
            style={styles.picker}
          >
            <Picker.Item label="Expense" value="expense" />
            <Picker.Item label="Income" value="income" />
            <Picker.Item label="Cost" value="cost" />
          </Picker>
          <Button
            mode="contained"
            onPress={() => setShowTypePicker(false)}
            style={styles.doneButton}
          >
            Done
          </Button>
        </View>
      )}
    </>
  );
};

export default TypePickerComponent; 