import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Transaction } from '../types/models';

const styles = StyleSheet.create({
  input: {
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  doneButton: {
    marginTop: 10,
    marginBottom: 4,
    width: '60%',
    alignSelf: 'center',
  },
});

const DatePickerComponent = ({ form, setForm, showDatePicker, setShowDatePicker }: { form: Partial<Transaction>; setForm: React.Dispatch<React.SetStateAction<Partial<Transaction>>>; showDatePicker: boolean; setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [tempDate, setTempDate] = React.useState<Date | null>(null);

  return (
    <>
      <Button
        mode="outlined"
        onPress={() => {
          setTempDate(form.date ? new Date(form.date) : new Date());
          setShowDatePicker(!showDatePicker);
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
                setForm((f: Partial<Transaction>) => ({ ...f, date: tempDate.toISOString().slice(0, 10) }));
              }
              setShowDatePicker(false);
            }}
            style={styles.doneButton}
          >
            Done
          </Button>
        </View>
      )}
    </>
  );
};

export default DatePickerComponent; 