import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, FAB } from 'react-native-paper';

interface Stay {
  id: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  income: number;
}

const StaysScreen = () => {
  const [stays, setStays] = React.useState<Stay[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Stays</Text>
      
      <FlatList
        data={stays}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.propertyName}</Title>
              <Paragraph>Check-in: {item.checkIn}</Paragraph>
              <Paragraph>Check-out: {item.checkOut}</Paragraph>
              <Paragraph>Income: ${item.income}</Paragraph>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No stays recorded yet</Text>
        }
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          // TODO: Implement add stay functionality
        }}
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
});

export default StaysScreen; 