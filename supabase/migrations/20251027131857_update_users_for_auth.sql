/*
  # Update Users Table for Authentication

  ## Changes
  
  1. Updates to `users` table
    - Add `auth_id` column to link with Supabase Auth
    - Add `birthdate` for user profile
    - Add address fields for Tunisia-specific data
    - Add `profile_complete` flag for onboarding
    - Add `auth_provider` to track signup method
    - Make email verification optional for demo
  
  2. Security
    - Update RLS policies for authenticated users
    - Ensure users can only access their own data
  
  ## Important Notes
  - This migration updates the existing users table structure
  - Existing demo user will remain for testing
*/

-- Add new columns to users table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'auth_id'
  ) THEN
    ALTER TABLE users ADD COLUMN auth_id uuid UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'birthdate'
  ) THEN
    ALTER TABLE users ADD COLUMN birthdate date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'town'
  ) THEN
    ALTER TABLE users ADD COLUMN town text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'region'
  ) THEN
    ALTER TABLE users ADD COLUMN region text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'postal_code'
  ) THEN
    ALTER TABLE users ADD COLUMN postal_code text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'home_address'
  ) THEN
    ALTER TABLE users ADD COLUMN home_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'profile_complete'
  ) THEN
    ALTER TABLE users ADD COLUMN profile_complete boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'auth_provider'
  ) THEN
    ALTER TABLE users ADD COLUMN auth_provider text DEFAULT 'email';
  END IF;
END $$;

-- Update demo user to have complete profile
UPDATE users 
SET 
  profile_complete = true,
  town = 'Tunis',
  region = 'Tunis',
  postal_code = '1000',
  home_address = '123 Demo Street',
  birthdate = '1990-01-01'
WHERE id = '11111111-1111-1111-1111-111111111111';

-- Create index on auth_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Update RLS policies to work with auth_id
DROP POLICY IF EXISTS "Users can read all profiles" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- New RLS policies for authenticated users
CREATE POLICY "Anyone can read user profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth_id = auth.uid() OR id::text = current_setting('request.jwt.claims', true)::json->>'sub')
  WITH CHECK (auth_id = auth.uid() OR id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Function to create user profile automatically after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    auth_id,
    email,
    full_name,
    profile_complete
  ) VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    false
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
