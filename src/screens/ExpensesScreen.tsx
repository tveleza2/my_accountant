import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Text, Card, FAB, Chip, Modal, Portal, Button, TextInput } from 'react-native-paper';
import { createTransaction, fetchIssuers, fetchCategories } from '../services/api';
import { Transaction, Issuer, Category } from '../types/models';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExpensesScreen = () => {
  const [expenses, setExpenses] = React.useState<Transaction[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form, setForm] = React.useState<Partial<Transaction>>({
    concept: '',
    amount: 0,
    date: new Date().toISOString().slice(0, 10),
    type: 'expense',
    invoice_image: '',
    issuer_id: undefined,
    category_id: undefined,
  });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | null>(null);
  const [issuers, setIssuers] = React.useState<Issuer[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [showTypePicker, setShowTypePicker] = React.useState(false);
  const [showIssuerPicker, setShowIssuerPicker] = React.useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = React.useState(false);

  React.useEffect(() => {
    fetchIssuers().then(setIssuers);
    fetchCategories().then(setCategories);
  }, []);

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
            <Button
              mode="outlined"
              onPress={() => {
                setTempDate(form.date ? new Date(form.date) : new Date());
                setShowDatePicker(true);
              }}
              style={styles.input}
            >
              {form.date ? `Date: ${form.date}` : 'Pick a date'}
            </Button>
            {showDatePicker && (
              <View>
                <DateTimePicker
                  value={tempDate || (form.date ? new Date(form.date) : new Date())}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(_, selectedDate) => {
                    if (selectedDate) {
                      setTempDate(selectedDate);
                    }
                  }}
                />
                <Button
                  mode="contained"
                  onPress={() => {
                    if (tempDate) {
                      setForm(f => ({ ...f, date: tempDate.toISOString().slice(0, 10) }));
                    }
                    setShowDatePicker(false);
                  }}
                  style={{ marginTop: 5, width: '50%' , alignSelf: 'center', marginBottom: 10}}
                >
                  Done
                </Button>
              </View>
            )}
            <Button
              mode="outlined"
              onPress={() => setShowTypePicker(true)}
              style={styles.input}
            >
              {form.type ? `Type: ${form.type}` : 'Select type'}
            </Button>
            {showTypePicker && (
              <View>
                <Picker
                  selectedValue={form.type}
                  onValueChange={value => setForm(f => ({ ...f, type: value as Transaction['type'] }))}
                  style={{ width: '100%', height: 150, backgroundColor: 'white' }}
                >
                  <Picker.Item label="Expense" value="expense" />
                  <Picker.Item label="Income" value="income" />
                  <Picker.Item label="Cost" value="cost" />
                </Picker>
                <Button
                  mode="contained"
                  onPress={() => setShowTypePicker(false)}
                  style={{ marginTop: 3, width: '50%', alignSelf: 'center' }}
                >
                  Done
                </Button>
              </View>
            )}
            <Button
              mode="outlined"
              onPress={() => setShowIssuerPicker(true)}
              style={styles.input}
            >
              {form.issuer_id ? `Issuer: ${issuers.find(i => i.id === form.issuer_id)?.name}` : 'Select issuer'}
            </Button>
            {showIssuerPicker && (
              <View>
                <Picker
                  selectedValue={form.issuer_id}
                  onValueChange={value => setForm(f => ({ ...f, issuer_id: value }))}
                  style={{ width: '100%', height: 200, backgroundColor: 'white' }}
                >
                  <Picker.Item label="Select issuer..." value={undefined} />
                  {issuers.map(issuer => (
                    <Picker.Item key={issuer.id} label={issuer.name} value={issuer.id} />
                  ))}
                </Picker>
                <Button
                  mode="contained"
                  onPress={() => setShowIssuerPicker(false)}
                  style={{ marginTop: 10, width: '50%', alignSelf: 'center' }}
                >
                  Done
                </Button>
              </View>
            )}
            <Button
              mode="outlined"
              onPress={() => setShowCategoryPicker(true)}
              style={styles.input}
            >
              {form.category_id ? `Category: ${categories.find(c => c.id === form.category_id)?.name}` : 'Select category'}
            </Button>
            {showCategoryPicker && (
              <View>
                <Picker
                  selectedValue={form.category_id}
                  onValueChange={value => setForm(f => ({ ...f, category_id: value }))}
                  style={{ width: '100%', height: 200, backgroundColor: 'white' }}
                >
                  <Picker.Item label="Select category..." value={undefined} />
                  {categories.map(category => (
                    <Picker.Item key={category.id} label={category.name} value={category.id} />
                  ))}
                </Picker>
                <Button
                  mode="contained"
                  onPress={() => setShowCategoryPicker(false)}
                  style={{ marginTop: 10, width: '50%', alignSelf: 'center' }}
                >
                  Done
                </Button>
              </View>
            )}
            <TextInput
              label="Concept"
              value={form.concept}
              onChangeText={text => setForm(f => ({ ...f, concept: text }))}
              style={styles.input}
            />
            <Button mode="contained" onPress={async () => {
              const newExpense = await createTransaction(form as Transaction);
              setExpenses(e => [...e, newExpense]);
              setModalVisible(false);
            }}>
              Add Expense
            </Button>
          </ScrollView>
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setModalVisible(true)}
      />
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
  pickerWrapper: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    width: '100%',
    color: '#000',
    backgroundColor: 'white',
  },
});

export default ExpensesScreen; 