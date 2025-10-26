import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecycleBinProvider } from './src/context/RecycleBinContext';
import { MarketplaceProvider } from './src/context/MarketplaceContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <RecycleBinProvider>
        <MarketplaceProvider>
          <NavigationContainer>
            <BottomTabNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </MarketplaceProvider>
      </RecycleBinProvider>
    </SafeAreaProvider>
  );
}
