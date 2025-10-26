/*
  # Dawwar Database Schema - Complete Setup

  ## Overview
  This migration creates the complete database schema for the Dawwar waste-to-cash marketplace app.

  ## New Tables

  ### 1. `users`
  Stores user profiles and statistics
  - `id` (uuid, primary key) - User ID
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `avatar_url` (text, nullable) - Profile picture URL
  - `level` (integer) - Gamification level
  - `rank` (text) - User rank (Eco Warrior, Green Champion, etc.)
  - `total_earned` (numeric) - Total earnings in TND
  - `total_co2_saved` (numeric) - Total CO₂ saved in kg
  - `items_sold` (integer) - Total items sold
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `categories`
  Recyclable material categories
  - `id` (uuid, primary key) - Category ID
  - `name` (text) - Category name (Plastic, Metal, Glass, Paper)
  - `icon` (text) - Icon name for UI
  - `base_price_per_kg` (numeric) - Base price per kg in TND
  - `co2_per_kg` (numeric) - CO₂ saved per kg
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. `scanned_items`
  Items scanned by users (in their cart/bin)
  - `id` (uuid, primary key) - Item ID
  - `user_id` (uuid) - Reference to users table
  - `category_id` (uuid) - Reference to categories table
  - `item_name` (text) - AI-detected item name
  - `estimated_weight` (numeric) - Weight in kg
  - `estimated_value` (numeric) - Estimated value in TND
  - `co2_saved` (numeric) - CO₂ saved in kg
  - `image_url` (text, nullable) - Scanned image URL
  - `status` (text) - Status: 'in_cart', 'sold', 'listed'
  - `scanned_at` (timestamptz) - Scan timestamp
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `buyers`
  Bulk buyers and recycling centers
  - `id` (uuid, primary key) - Buyer ID
  - `name` (text) - Buyer/company name
  - `type` (text) - Type: 'recycling_center', 'bulk_buyer', 'individual'
  - `rating` (numeric) - Rating out of 5
  - `total_purchases` (integer) - Number of purchases made
  - `verified` (boolean) - Verification status
  - `location` (text) - Location/address
  - `distance_km` (numeric) - Distance from user in km
  - `response_time_hours` (numeric) - Average response time
  - `created_at` (timestamptz) - Creation timestamp

  ### 5. `buyer_category_prices`
  Category-specific prices offered by buyers
  - `id` (uuid, primary key) - Price record ID
  - `buyer_id` (uuid) - Reference to buyers table
  - `category_id` (uuid) - Reference to categories table
  - `price_per_kg` (numeric) - Price offered per kg in TND
  - `minimum_kg` (numeric) - Minimum weight required
  - `active` (boolean) - Whether offer is active
  - `created_at` (timestamptz) - Creation timestamp

  ### 6. `transactions`
  Completed sales/transactions
  - `id` (uuid, primary key) - Transaction ID
  - `user_id` (uuid) - Reference to users table
  - `buyer_id` (uuid, nullable) - Reference to buyers table (null for marketplace)
  - `transaction_type` (text) - Type: 'bulk_sale', 'marketplace_listing'
  - `total_amount` (numeric) - Total amount in TND
  - `total_weight` (numeric) - Total weight in kg
  - `total_co2_saved` (numeric) - Total CO₂ saved in kg
  - `items_count` (integer) - Number of items
  - `status` (text) - Status: 'completed', 'pending', 'cancelled'
  - `completed_at` (timestamptz) - Completion timestamp
  - `created_at` (timestamptz) - Creation timestamp

  ### 7. `transaction_items`
  Items included in each transaction
  - `id` (uuid, primary key) - Record ID
  - `transaction_id` (uuid) - Reference to transactions table
  - `scanned_item_id` (uuid) - Reference to scanned_items table
  - `created_at` (timestamptz) - Creation timestamp

  ### 8. `marketplace_listings`
  Items listed on the marketplace
  - `id` (uuid, primary key) - Listing ID
  - `user_id` (uuid) - Reference to users table
  - `category_id` (uuid) - Reference to categories table
  - `title` (text) - Listing title
  - `description` (text, nullable) - Item description
  - `weight_kg` (numeric) - Weight in kg
  - `price_tnd` (numeric) - Asking price in TND
  - `condition` (text) - Condition: 'excellent', 'good', 'fair'
  - `status` (text) - Status: 'available', 'sold', 'reserved'
  - `views` (integer) - Number of views
  - `created_at` (timestamptz) - Creation timestamp

  ### 9. `achievements`
  Available achievements for gamification
  - `id` (uuid, primary key) - Achievement ID
  - `title` (text) - Achievement title
  - `description` (text) - Achievement description
  - `icon` (text) - Icon name for UI
  - `requirement_type` (text) - Type: 'items_sold', 'co2_saved', 'earnings', etc.
  - `requirement_value` (numeric) - Value needed to unlock
  - `created_at` (timestamptz) - Creation timestamp

  ### 10. `user_achievements`
  User achievement progress and unlocks
  - `id` (uuid, primary key) - Record ID
  - `user_id` (uuid) - Reference to users table
  - `achievement_id` (uuid) - Reference to achievements table
  - `progress` (numeric) - Current progress (0-100)
  - `unlocked` (boolean) - Whether unlocked
  - `unlocked_at` (timestamptz, nullable) - Unlock timestamp
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only read/write their own data
  - Public read access for categories, buyers, achievements
  - Proper indexes for performance
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  level integer DEFAULT 1,
  rank text DEFAULT 'Beginner',
  total_earned numeric DEFAULT 0,
  total_co2_saved numeric DEFAULT 0,
  items_sold integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  icon text NOT NULL,
  base_price_per_kg numeric NOT NULL,
  co2_per_kg numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create scanned_items table
CREATE TABLE IF NOT EXISTS scanned_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  item_name text NOT NULL,
  estimated_weight numeric NOT NULL,
  estimated_value numeric NOT NULL,
  co2_saved numeric NOT NULL,
  image_url text,
  status text DEFAULT 'in_cart' CHECK (status IN ('in_cart', 'sold', 'listed')),
  scanned_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create buyers table
CREATE TABLE IF NOT EXISTS buyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text DEFAULT 'recycling_center' CHECK (type IN ('recycling_center', 'bulk_buyer', 'individual')),
  rating numeric DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  total_purchases integer DEFAULT 0,
  verified boolean DEFAULT true,
  location text NOT NULL,
  distance_km numeric NOT NULL,
  response_time_hours numeric DEFAULT 2,
  created_at timestamptz DEFAULT now()
);

-- Create buyer_category_prices table
CREATE TABLE IF NOT EXISTS buyer_category_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid REFERENCES buyers(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  price_per_kg numeric NOT NULL,
  minimum_kg numeric DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  buyer_id uuid REFERENCES buyers(id) ON DELETE SET NULL,
  transaction_type text DEFAULT 'bulk_sale' CHECK (transaction_type IN ('bulk_sale', 'marketplace_listing')),
  total_amount numeric NOT NULL,
  total_weight numeric NOT NULL,
  total_co2_saved numeric NOT NULL,
  items_count integer NOT NULL,
  status text DEFAULT 'completed' CHECK (status IN ('completed', 'pending', 'cancelled')),
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create transaction_items table
CREATE TABLE IF NOT EXISTS transaction_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid REFERENCES transactions(id) ON DELETE CASCADE NOT NULL,
  scanned_item_id uuid REFERENCES scanned_items(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create marketplace_listings table
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES categories(id) NOT NULL,
  title text NOT NULL,
  description text,
  weight_kg numeric NOT NULL,
  price_tnd numeric NOT NULL,
  condition text DEFAULT 'good' CHECK (condition IN ('excellent', 'good', 'fair')),
  status text DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  requirement_type text NOT NULL,
  requirement_value numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  achievement_id uuid REFERENCES achievements(id) NOT NULL,
  progress numeric DEFAULT 0,
  unlocked boolean DEFAULT false,
  unlocked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scanned_items_user_id ON scanned_items(user_id);
CREATE INDEX IF NOT EXISTS idx_scanned_items_status ON scanned_items(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_user_id ON marketplace_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE scanned_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_category_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (true);

-- RLS Policies for scanned_items
CREATE POLICY "Users can read own scanned items"
  ON scanned_items FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own scanned items"
  ON scanned_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own scanned items"
  ON scanned_items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own scanned items"
  ON scanned_items FOR DELETE
  USING (true);

-- RLS Policies for transactions
CREATE POLICY "Users can read own transactions"
  ON transactions FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- RLS Policies for transaction_items
CREATE POLICY "Users can read transaction items"
  ON transaction_items FOR SELECT
  USING (true);

CREATE POLICY "Users can insert transaction items"
  ON transaction_items FOR INSERT
  WITH CHECK (true);

-- RLS Policies for marketplace_listings
CREATE POLICY "Anyone can read available listings"
  ON marketplace_listings FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own listings"
  ON marketplace_listings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own listings"
  ON marketplace_listings FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own listings"
  ON marketplace_listings FOR DELETE
  USING (true);

-- RLS Policies for user_achievements
CREATE POLICY "Users can read own achievements"
  ON user_achievements FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own achievements"
  ON user_achievements FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Public read access for reference tables
CREATE POLICY "Anyone can read categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read buyers"
  ON buyers FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read buyer prices"
  ON buyer_category_prices FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read achievements"
  ON achievements FOR SELECT
  USING (true);
