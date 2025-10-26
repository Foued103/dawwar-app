import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MarketplaceListing {
  id: string;
  title: string;
  category: string;
  description: string;
  weight: string;
  price: number;
  condition: 'Excellent' | 'Good' | 'Fair';
  images?: string[];
  sellerName: string;
  location: string;
  timestamp: number;
  status: 'active' | 'sold' | 'inactive';
}

interface MarketplaceContextType {
  listings: MarketplaceListing[];
  addListing: (listing: Omit<MarketplaceListing, 'id' | 'timestamp' | 'status' | 'sellerName' | 'location'>) => void;
  removeListing: (id: string) => void;
  updateListing: (id: string, updates: Partial<MarketplaceListing>) => void;
  getMyListings: () => MarketplaceListing[];
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<MarketplaceListing[]>([
    // Sample listings for demo
    {
      id: '1',
      title: '50 Plastic Bottles',
      category: 'Plastic',
      description: 'Clean PET plastic bottles ready for recycling',
      weight: '5.0 kg',
      price: 12.5,
      condition: 'Good',
      sellerName: 'Ahmed K.',
      location: 'Tunis, Tunisia',
      timestamp: Date.now() - 3600000,
      status: 'active',
    },
    {
      id: '2',
      title: 'Aluminum Cans Collection',
      category: 'Metal',
      description: 'Mixed aluminum cans, crushed and ready',
      weight: '3.2 kg',
      price: 18.0,
      condition: 'Excellent',
      sellerName: 'Sara M.',
      location: 'Sfax, Tunisia',
      timestamp: Date.now() - 7200000,
      status: 'active',
    },
  ]);

  const addListing = (listing: Omit<MarketplaceListing, 'id' | 'timestamp' | 'status' | 'sellerName' | 'location'>) => {
    const newListing: MarketplaceListing = {
      ...listing,
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: 'active',
      sellerName: 'You', // In real app, get from user context
      location: 'Tunis, Tunisia', // In real app, get from user location
    };
    setListings(prev => [newListing, ...prev]);
  };

  const removeListing = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
  };

  const updateListing = (id: string, updates: Partial<MarketplaceListing>) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };

  const getMyListings = () => {
    return listings.filter(listing => listing.sellerName === 'You');
  };

  return (
    <MarketplaceContext.Provider value={{ listings, addListing, removeListing, updateListing, getMyListings }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within MarketplaceProvider');
  }
  return context;
}
