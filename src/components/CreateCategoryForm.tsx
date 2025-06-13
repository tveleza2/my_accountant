import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Category } from '../types/models';

interface CreateCategoryFormProps {
  form: Partial<Category>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Category>>>;
  onAddCategory: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ form, setForm, onAddCategory }) => {
  return (
    <ScrollView>
      <TextInput
        label="Category Name"
        value={form.name}
        onChangeText={text => setForm(f => ({ ...f, name: text }))}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={form.description}
        onChangeText={text => setForm(f => ({ ...f, description: text }))}
        style={styles.input}
      />
      <Button mode="contained" onPress={onAddCategory}>
        Add Category
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

export default CreateCategoryForm; 