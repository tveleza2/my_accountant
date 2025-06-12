import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Airbnb Finance Dashboard</Text>
      
      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Total Income</Title>
            <Paragraph>$0.00</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Total Expenses</Title>
            <Paragraph>$0.00</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Net Profit</Title>
            <Paragraph>$0.00</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Active Stays</Title>
            <Paragraph>0</Paragraph>
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
    marginBottom: 16,
  },
});

export default HomeScreen; 