import React from 'react';
import { ScrollView, StyleSheet, Alert, Image, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
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
  const handleImagePick = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets[0]) {
        setForm(f => ({ ...f, invoice_image: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

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
        // value={form.amount || ''}
        onChangeText={text => {
          // Allow empty string, numbers, single decimal point, and negative sign
          if (text === '' || /^-?\d*\.?\d*$/.test(text)) {
            setForm(f => ({ ...f, amount: text }));
          }
        }
        }
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
      
      <Button 
        mode="outlined" 
        onPress={handleImagePick}
        style={styles.button}
      >
        {form.invoice_image ? 'Change Receipt Image' : 'Add Receipt Image'}
      </Button>
      
      {form.invoice_image && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: form.invoice_image }} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>
      )}

      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={styles.button}
      >
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
  button: {
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});

export default CreateExpenseForm;