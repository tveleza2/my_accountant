import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Airbnb Finance Dashboard</Text>
      
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>Total Income</Text>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>$0.00</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>Total Expenses</Text>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>$0.00</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>Net Profit</Text>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>$0.00</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge" style={{ textAlign: 'center' }}>Monthly Balance</Text>
            <Text variant="bodyMedium" style={{ textAlign: 'center' }}>0</Text>
          </Card.Content>
        </Card>
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 200,
    marginBottom: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: { justifyContent: 'center', alignItems: 'center'}
});

export default HomeScreen; 