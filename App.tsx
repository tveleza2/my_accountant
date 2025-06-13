import React, { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { deleteDb, initDatabase } from './src/services/database';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import StaysScreen from './src/screens/StaysScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const checkAndInitDb = async () => {
      const dbName = 'accounting.db';
      const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
      const dbInfo = await FileSystem.getInfoAsync(dbPath);
      if (!dbInfo.exists) {
        await initDatabase(dbName);
      }
    };
    checkAndInitDb();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'Dashboard',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
            />
            {/* <Tab.Screen 
              name="Stays" 
              component={StaysScreen}
              options={{
                title: 'My Stays',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bed" color={color} size={size} />
                ),
              }}
            /> */}
            <Tab.Screen 
              name="Expenses" 
              component={ExpensesScreen}
              options={{
                title: 'Expenses',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen 
              name="Reports" 
              component={ReportsScreen}
              options={{
                title: 'Reports',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
} 