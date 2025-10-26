import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RecycleItem {
  id: string;
  name: string;
  category: string;
  weight: string;
  co2Saved: string;
  reward: number;
  icon: string;
  color: string;
  timestamp: number;
}

interface RecycleBinContextType {
  items: RecycleItem[];
  addItem: (item: Omit<RecycleItem, 'id' | 'timestamp'>) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  getTotalStats: () => {
    totalItems: number;
    totalWeight: string;
    totalCO2: number;
    totalReward: string;
  };
}

const RecycleBinContext = createContext<RecycleBinContextType | undefined>(undefined);

export function RecycleBinProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecycleItem[]>([]);

  const addItem = (item: Omit<RecycleItem, 'id' | 'timestamp'>) => {
    const newItem: RecycleItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const getTotalStats = () => {
    const totalItems = items.length;
    const totalWeight = items.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(1);
    const totalCO2 = items.reduce((sum, item) => sum + parseFloat(item.co2Saved), 0);
    const totalReward = items.reduce((sum, item) => sum + item.reward, 0).toFixed(1);

    return { totalItems, totalWeight, totalCO2, totalReward };
  };

  return (
    <RecycleBinContext.Provider value={{ items, addItem, removeItem, clearAll, getTotalStats }}>
      {children}
    </RecycleBinContext.Provider>
  );
}

export function useRecycleBin() {
  const context = useContext(RecycleBinContext);
  if (!context) {
    throw new Error('useRecycleBin must be used within RecycleBinProvider');
  }
  return context;
}
