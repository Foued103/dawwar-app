import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, ScannedItem } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface RecycleItem {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  weight: string;
  co2Saved: string;
  reward: number;
  icon: string;
  color: string;
  timestamp: number;
}

interface RecycleBinContextType {
  items: RecycleItem[];
  loading: boolean;
  addItem: (item: Omit<RecycleItem, 'id' | 'timestamp'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  refreshItems: () => Promise<void>;
  getTotalStats: () => {
    totalItems: number;
    totalWeight: string;
    totalCO2: number;
    totalReward: string;
  };
}

const RecycleBinContext = createContext<RecycleBinContextType | undefined>(undefined);

const getCategoryIcon = (categoryName: string): string => {
  const iconMap: Record<string, string> = {
    Plastic: 'bottle',
    Metal: 'construct',
    Glass: 'wine',
    Paper: 'document',
    Cardboard: 'cube',
  };
  return iconMap[categoryName] || 'cube';
};

const getCategoryColor = (categoryName: string): string => {
  const colorMap: Record<string, string> = {
    Plastic: '#3B82F6',
    Metal: '#8B5CF6',
    Glass: '#10B981',
    Paper: '#F59E0B',
    Cardboard: '#EF4444',
  };
  return colorMap[categoryName] || '#6B7280';
};

export function RecycleBinProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<RecycleItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scanned_items')
        .select(`
          *,
          categories (
            name,
            icon
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'in_cart')
        .order('scanned_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedItems: RecycleItem[] = data.map((item: any) => ({
          id: item.id,
          name: item.item_name,
          category: item.categories.name,
          categoryId: item.category_id,
          weight: item.estimated_weight.toString(),
          co2Saved: item.co2_saved.toString(),
          reward: item.estimated_value,
          icon: getCategoryIcon(item.categories.name),
          color: getCategoryColor(item.categories.name),
          timestamp: new Date(item.scanned_at).getTime(),
        }));
        setItems(mappedItems);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const addItem = async (item: Omit<RecycleItem, 'id' | 'timestamp'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('scanned_items')
        .insert({
          user_id: user.id,
          category_id: item.categoryId,
          item_name: item.name,
          estimated_weight: parseFloat(item.weight),
          estimated_value: item.reward,
          co2_saved: parseFloat(item.co2Saved),
          status: 'in_cart',
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newItem: RecycleItem = {
          id: data.id,
          ...item,
          timestamp: new Date(data.scanned_at).getTime(),
        };
        setItems((prev) => [...prev, newItem]);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scanned_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearAll = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('scanned_items')
        .delete()
        .eq('user_id', user.id)
        .eq('status', 'in_cart');

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error('Error clearing items:', error);
    }
  };

  const refreshItems = async () => {
    await fetchItems();
  };

  const getTotalStats = () => {
    const totalItems = items.length;
    const totalWeight = items.reduce((sum, item) => sum + parseFloat(item.weight), 0).toFixed(1);
    const totalCO2 = items.reduce((sum, item) => sum + parseFloat(item.co2Saved), 0);
    const totalReward = items.reduce((sum, item) => sum + item.reward, 0).toFixed(1);

    return { totalItems, totalWeight, totalCO2, totalReward };
  };

  return (
    <RecycleBinContext.Provider
      value={{ items, loading, addItem, removeItem, clearAll, refreshItems, getTotalStats }}
    >
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
