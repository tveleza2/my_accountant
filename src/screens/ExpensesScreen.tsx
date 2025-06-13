import React from 'react';
import { View, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import { Text, Card, FAB, Chip, Modal, Portal, Button, TextInput } from 'react-native-paper';
import { createTransaction, getIssuers, getCategories, createIssuer, createCategory, initDatabase } from '../services/database';
import { Transaction, Issuer, Category } from '../types/models';
import CreateExpenseForm from '../components/CreateExpenseForm';
import CreateIssuerForm from '../components/CreateIssuerForm';
import CreateCategoryForm from '../components/CreateCategoryForm';

const ExpensesScreen = () => {
  const [expenses, setExpenses] = React.useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [issuerModalVisible, setIssuerModalVisible] = React.useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
  const [form, setForm] = React.useState<Partial<Transaction>>({
    concept: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    type: 'expense',
    invoice_image: '',
    issuer_id: undefined,
    category_id: undefined,
  });
  const [issuerForm, setIssuerForm] = React.useState<Partial<Issuer>>({
    name: '',
  });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [issuers, setIssuers] = React.useState<Issuer[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [showTypePicker, setShowTypePicker] = React.useState(false);
  const [showIssuerPicker, setShowIssuerPicker] = React.useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [categoryForm, setCategoryForm] = React.useState<Partial<Category>>({
    name: '',
    description: '',
  });

  React.useEffect(() => {
    // Fetch issuers and categories from local DB
    getIssuers().then(setIssuers);
    getCategories().then(setCategories);
    // Optionally, fetch expenses/transactions if you want to display them
    // getTransactions().then(setExpenses);
  }, []);

  const handleAddExpense = async () => {
    const newExpense = await createTransaction(form as Transaction);
    setExpenses(e => [...e, newExpense]);
    setModalVisible(false);
    setForm({
      concept: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      type: 'expense',
      invoice_image: '',
      issuer_id: undefined,
      category_id: undefined,
    });
  };

  const handleAddIssuer = async () => {
    if (issuerForm.name) {
      console.log('Creating issuer:', issuerForm.name);
      
      const newIssuer = await createIssuer(issuerForm.name);
      setIssuers(i => [...i, newIssuer]);
      setIssuerModalVisible(false);
      setIssuerForm({ name: '' });
    }
  };

  const handleAddCategory = async () => {
    if (categoryForm.name) {
      const newCategory = await createCategory(categoryForm.name, categoryForm.description || '');
      setCategories(c => [...c, newCategory]);
      setCategoryModalVisible(false);
      setCategoryForm({ name: '', description: '' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{item.concept}</Text>
              <Text variant="bodyMedium">Amount: ${item.amount.toFixed(2)}</Text>
              <Text variant="bodyMedium">Date: {item.date}</Text>
              <Chip style={styles.chip}>{item.category_id}</Chip>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses recorded yet</Text>
        }
      />

      <Portal>
        <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20}}>
          <CreateExpenseForm
            form={form}
            setForm={setForm}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            showTypePicker={showTypePicker}
            setShowTypePicker={setShowTypePicker}
            showIssuerPicker={showIssuerPicker}
            setShowIssuerPicker={setShowIssuerPicker}
            showCategoryPicker={showCategoryPicker}
            setShowCategoryPicker={setShowCategoryPicker}
            issuers={issuers}
            categories={categories}
            onAddExpense={handleAddExpense}
          />
        </Modal>
        <Modal visible={issuerModalVisible} onDismiss={() => setIssuerModalVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20}}>
          <CreateIssuerForm
            form={issuerForm}
            setForm={setIssuerForm}
            onAddIssuer={handleAddIssuer}
          />
        </Modal>
        <Modal visible={categoryModalVisible} onDismiss={() => setCategoryModalVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20}}>
          <CreateCategoryForm
            form={categoryForm}
            setForm={setCategoryForm}
            onAddCategory={handleAddCategory}
          />
        </Modal>
      </Portal>

      <View style={styles.fabContainer}>
        {showOptions && (
          <View style={styles.optionsList}>
            <Button mode="text" onPress={() => { setModalVisible(true); setShowOptions(false); }}>Create Expense</Button>
            <Button mode="text" onPress={() => { setIssuerModalVisible(true); setShowOptions(false); }}>Create Issuer</Button>
            <Button mode="text" onPress={() => { setCategoryModalVisible(true); setShowOptions(false); }}>Create Category</Button>
          </View>
        )}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setShowOptions(!showOptions)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  chip: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 100,
  },
  input: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
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
  fabContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
  optionsList: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ExpensesScreen; 