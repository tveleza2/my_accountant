import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button } from 'react-native-paper';

const ReportsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Reports</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Monthly Summary</Title>
          <Paragraph>Total Income: $0.00</Paragraph>
          <Paragraph>Total Expenses: $0.00</Paragraph>
          <Paragraph>Net Profit: $0.00</Paragraph>
          <Button mode="contained" style={styles.button}>
            View Details
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Expense Categories</Title>
          <Paragraph>Cleaning: $0.00</Paragraph>
          <Paragraph>Maintenance: $0.00</Paragraph>
          <Paragraph>Supplies: $0.00</Paragraph>
          <Paragraph>Other: $0.00</Paragraph>
          <Button mode="contained" style={styles.button}>
            View Details
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Occupancy Rate</Title>
          <Paragraph>Current Month: 0%</Paragraph>
          <Paragraph>Last Month: 0%</Paragraph>
          <Paragraph>Average: 0%</Paragraph>
          <Button mode="contained" style={styles.button}>
            View Details
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
  button: {
    marginTop: 16,
  },
});

export default ReportsScreen; 