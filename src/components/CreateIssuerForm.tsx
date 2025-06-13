import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Issuer } from '../types/models';

interface CreateIssuerFormProps {
  form: Partial<Issuer>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Issuer>>>;
  onAddIssuer: () => void;
}

const CreateIssuerForm: React.FC<CreateIssuerFormProps> = ({ form, setForm, onAddIssuer }) => {
  return (
    <ScrollView>
      <TextInput
        label="Name"
        value={form.name}
        onChangeText={text => setForm(f => ({ ...f, name: text }))}
        style={styles.input}
      />
      <Button mode="contained" onPress={onAddIssuer}>
        Add Issuer
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});

export default CreateIssuerForm; 