import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import StaysScreen from './src/screens/StaysScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'Dashboard'
              }}
            />
            <Tab.Screen 
              name="Stays" 
              component={StaysScreen}
              options={{
                title: 'My Stays'
              }}
            />
            <Tab.Screen 
              name="Expenses" 
              component={ExpensesScreen}
              options={{
                title: 'Expenses'
              }}
            />
            <Tab.Screen 
              name="Reports" 
              component={ReportsScreen}
              options={{
                title: 'Reports'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 