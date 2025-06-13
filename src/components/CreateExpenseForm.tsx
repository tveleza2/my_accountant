import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Transaction, Issuer, Category } from '../types/models';
import DatePickerComponent from './DatePickerComponent';
import TypePickerComponent from './TypePickerComponent';
import IssuerPickerComponent from './IssuerPickerComponent';
import CategoryPickerComponent from './CategoryPickerComponent';

interface CreateExpenseFormProps {
  form: Partial<Transaction>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Transaction>>>;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  showTypePicker: boolean;
  setShowTypePicker: React.Dispatch<React.SetStateAction<boolean>>;
  showIssuerPicker: boolean;
  setShowIssuerPicker: React.Dispatch<React.SetStateAction<boolean>>;
  showCategoryPicker: boolean;
  setShowCategoryPicker: React.Dispatch<React.SetStateAction<boolean>>;
  issuers: Issuer[];
  categories: Category[];
  onAddExpense: () => void;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({ form, setForm, showDatePicker, setShowDatePicker, showTypePicker, setShowTypePicker, showIssuerPicker, setShowIssuerPicker, showCategoryPicker, setShowCategoryPicker, issuers, categories, onAddExpense }) => {
  return (
    <ScrollView>
      <TextInput
        label="Description"
        value={form.concept}
        onChangeText={text => setForm(f => ({ ...f, concept: text }))}
        style={styles.input}
      />
      <TextInput
        label="Amount"
        value={form.amount?.toString() || ''}
        onChangeText={text => setForm(f => ({ ...f, amount: parseFloat(text) }))}
        keyboardType="numeric"
        style={styles.input}
      />
      <DatePickerComponent form={form} setForm={setForm} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} />
      <TypePickerComponent form={form} setForm={setForm} showTypePicker={showTypePicker} setShowTypePicker={setShowTypePicker} />
      <IssuerPickerComponent form={form} setForm={setForm} showIssuerPicker={showIssuerPicker} setShowIssuerPicker={setShowIssuerPicker} issuers={issuers} />
      <CategoryPickerComponent form={form} setForm={setForm} showCategoryPicker={showCategoryPicker} setShowCategoryPicker={setShowCategoryPicker} categories={categories} />
      <TextInput
        label="Concept"
        value={form.concept}
        onChangeText={text => setForm(f => ({ ...f, concept: text }))}
        style={styles.input}
      />
      <Button mode="contained" onPress={onAddExpense}>
        Add Expense
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

export default CreateExpenseForm; 