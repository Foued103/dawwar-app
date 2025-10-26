import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen from '../screens/MarketplaceScreen';
import RecycleBinScreen from '../screens/RecycleBinScreen';
import CreateListingScreen from '../screens/CreateListingScreen';
import SmartMatchingScreen from '../screens/SmartMatchingScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';

export type MarketplaceStackParamList = {
  MarketplaceMain: undefined;
  RecycleBin: undefined;
  CreateListing: undefined;
  SmartMatching: {
    totalItems: number;
    totalWeight: string;
    totalReward: string;
    totalCO2: string;
  };
  Confirmation: {
    buyer: {
      name: string;
      distance: string;
      rating: number;
    };
    totalItems: number;
    totalWeight: string;
    totalReward: string;
    totalCO2: string;
  };
  ItemDetail: {
    listingId: string;
  };
};

const Stack = createStackNavigator<MarketplaceStackParamList>();

export default function MarketplaceStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MarketplaceMain" component={MarketplaceScreen} />
      <Stack.Screen name="RecycleBin" component={RecycleBinScreen} />
      <Stack.Screen name="CreateListing" component={CreateListingScreen} />
      <Stack.Screen name="SmartMatching" component={SmartMatchingScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
    </Stack.Navigator>
  );
}
