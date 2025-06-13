import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Transaction, Issuer, Category } from '../types/models';
import DatePickerComponent from './DatePickerComponent';
import TypePickerComponent from './TypePickerComponent';
import IssuerPickerComponent from './IssuerPickerComponent';
import CategoryPickerComponent from './CategoryPickerComponent';
import { createTransaction } from '../services/database';

// Define the form state type that all components will use
export type FormState = Omit<Partial<Transaction>, 'amount'> & {
  amount?: string;
};

interface CreateExpenseFormProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
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
  onSuccess: () => void;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  form,
  setForm,
  showDatePicker,
  setShowDatePicker,
  showTypePicker,
  setShowTypePicker,
  showIssuerPicker,
  setShowIssuerPicker,
  showCategoryPicker,
  setShowCategoryPicker,
  issuers,
  categories,
  onSuccess
}) => {
  const handleSubmit = async () => {
    if (!form.amount || !form.date || !form.type || !form.issuer_id || !form.category_id) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const amount = parseFloat(form.amount);
    if (isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      const transaction: Omit<Transaction, 'id'> = {
        date: form.date,
        type: form.type,
        issuer_id: form.issuer_id,
        category_id: form.category_id,
        amount,
        concept: form.concept ?? '',
        invoice_image: form.invoice_image ?? '',
      };
      
      await createTransaction(transaction);
      onSuccess();
    } catch (error) {
      console.error('Error creating transaction:', error);
      Alert.alert('Error', 'Failed to create transaction');
    }
  };

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
        value={form.amount || ''}
        // onChangeText={text => {
        //   // Allow empty string, numbers, single decimal point, and negative sign
        //   if (text === '' || /^-?\d*\.?\d*$/.test(text)) {
        //     setForm(f => ({ ...f, amount: text }));
        //   }
        // }
        // }
        keyboardType="numeric"
        style={styles.input}
      />
      <DatePickerComponent
        form={form as Partial<Transaction>}
        setForm={setForm as React.Dispatch<React.SetStateAction<Partial<Transaction>>>}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
      />
      <TypePickerComponent
        form={form as Partial<Transaction>}
        setForm={setForm as React.Dispatch<React.SetStateAction<Partial<Transaction>>>}
        showTypePicker={showTypePicker}
        setShowTypePicker={setShowTypePicker}
      />
      <IssuerPickerComponent
        form={form as Partial<Transaction>}
        setForm={setForm as React.Dispatch<React.SetStateAction<Partial<Transaction>>>}
        showIssuerPicker={showIssuerPicker}
        setShowIssuerPicker={setShowIssuerPicker}
        issuers={issuers}
      />
      <CategoryPickerComponent
        form={form as Partial<Transaction>}
        setForm={setForm as React.Dispatch<React.SetStateAction<Partial<Transaction>>>}
        showCategoryPicker={showCategoryPicker}
        setShowCategoryPicker={setShowCategoryPicker}
        categories={categories}
      />
      <TextInput
        label="Concept"
        value={form.concept}
        onChangeText={text => setForm(f => ({ ...f, concept: text }))}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSubmit}>
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