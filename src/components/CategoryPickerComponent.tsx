import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Transaction, Category } from '../types/models';

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

const CategoryPickerComponent = ({ form, setForm, showCategoryPicker, setShowCategoryPicker, categories }: { form: Partial<Transaction>; setForm: React.Dispatch<React.SetStateAction<Partial<Transaction>>>; showCategoryPicker: boolean; setShowCategoryPicker: React.Dispatch<React.SetStateAction<boolean>>; categories: Category[] }) => {
  return (
    <>
      <Button
        mode="outlined"
        onPress={() => setShowCategoryPicker(!showCategoryPicker)}
        style={styles.input}
      >
        {form.category_id ? `Category: ${categories.find(c => c.id == form.category_id)?.name}` : 'Select category'}
      </Button>
      {showCategoryPicker && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.category_id}
            onValueChange={value => setForm((f: Partial<Transaction>) => ({ ...f, category_id: value }))}
            style={styles.picker}
          >
            <Picker.Item label="Select category..." value={""} />
            {categories.map(category => (
              <Picker.Item key={category.id} label={category.name} value={category.id} />
            ))}
          </Picker>
          <Button
            mode="contained"
            onPress={() => setShowCategoryPicker(false)}
            style={styles.doneButton}
          >
            Done
          </Button>
        </View>
      )}
    </>
  );
};

export default CategoryPickerComponent; 