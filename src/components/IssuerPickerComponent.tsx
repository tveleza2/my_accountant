import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Transaction, Issuer } from '../types/models';

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

const IssuerPickerComponent = ({ form, setForm, showIssuerPicker, setShowIssuerPicker, issuers }: { form: Partial<Transaction>; setForm: React.Dispatch<React.SetStateAction<Partial<Transaction>>>; showIssuerPicker: boolean; setShowIssuerPicker: React.Dispatch<React.SetStateAction<boolean>>; issuers: Issuer[] }) => {
  return (
    <>
      <Button
        mode="outlined"
        onPress={() => setShowIssuerPicker(!showIssuerPicker)}
        style={styles.input}
      >
        {form.issuer_id ? `Issuer: ${issuers.find(i => i.id === form.issuer_id)?.name}` : 'Select issuer'}
      </Button>
      {showIssuerPicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.issuer_id}
            onValueChange={value => setForm((f: Partial<Transaction>) => ({ ...f, issuer_id: value }))}
            style={styles.picker}
          >
            <Picker.Item label="Select issuer..." value={undefined} />
            {issuers.map(issuer => (
              <Picker.Item key={issuer.id} label={issuer.name} value={issuer.id} />
            ))}
          </Picker>
          <Button
            mode="contained"
            onPress={() => setShowIssuerPicker(false)}
            style={styles.doneButton}
          >
            Done
          </Button>
        </View>
      )}
    </>
  );
};

export default IssuerPickerComponent; 