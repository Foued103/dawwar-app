import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  icon: string;
  base_price_per_kg: number;
  co2_per_kg: number;
  created_at: string;
};

export type ScannedItem = {
  id: string;
  user_id: string;
  category_id: string;
  item_name: string;
  estimated_weight: number;
  estimated_value: number;
  co2_saved: number;
  image_url?: string;
  status: 'in_cart' | 'sold' | 'listed';
  scanned_at: string;
  created_at: string;
};

export type Buyer = {
  id: string;
  name: string;
  type: 'recycling_center' | 'bulk_buyer' | 'individual';
  rating: number;
  total_purchases: number;
  verified: boolean;
  location: string;
  distance_km: number;
  response_time_hours: number;
  created_at: string;
};

export type BuyerCategoryPrice = {
  id: string;
  buyer_id: string;
  category_id: string;
  price_per_kg: number;
  minimum_kg: number;
  active: boolean;
  created_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  buyer_id?: string;
  transaction_type: 'bulk_sale' | 'marketplace_listing';
  total_amount: number;
  total_weight: number;
  total_co2_saved: number;
  items_count: number;
  status: 'completed' | 'pending' | 'cancelled';
  completed_at: string;
  created_at: string;
};

export type MarketplaceListing = {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description?: string;
  weight_kg: number;
  price_tnd: number;
  condition: 'excellent' | 'good' | 'fair';
  status: 'available' | 'sold' | 'reserved';
  views: number;
  created_at: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
};

export type UserAchievement = {
  id: string;
  user_id: string;
  achievement_id: string;
  progress: number;
  unlocked: boolean;
  unlocked_at?: string;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  level: number;
  rank: string;
  total_earned: number;
  total_co2_saved: number;
  items_sold: number;
  created_at: string;
  updated_at: string;
};
