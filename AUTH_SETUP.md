# Authentication Setup - Dawwar App

## Overview

Dawwar now has a complete authentication system using Supabase Auth with email/password signup and login.

## Authentication Flow

### New Users
1. **Welcome Screen** → Beautiful landing page with "Get Started" and "Log In" buttons
2. **Sign Up Screen (Step 1/2)** → Full name, email, password, confirm password, birthdate
3. **Sign Up Screen (Step 2/2)** → Town, region (auto-filled), postal code, home address
4. **Main App** → User is automatically logged in and redirected to Scanner tab

### Returning Users
1. **Welcome Screen** → Tap "Log In"
2. **Login Screen** → Enter email and password
3. **Main App** → Access all features with saved data

## Features Implemented

### Database Schema
- ✅ `auth_id` column links users table to Supabase Auth
- ✅ Address fields (town, region, postal_code, home_address)
- ✅ `profile_complete` flag for onboarding tracking
- ✅ `birthdate` field
- ✅ `auth_provider` field (email, google, apple)
- ✅ Automatic user profile creation on signup via trigger

### Auth Screens
- ✅ **WelcomeScreen**: Beautiful landing page with green gradient, app features
- ✅ **LoginScreen**: Email/password login with show/hide password toggle
- ✅ **SignUpScreen**: Two-step signup form with validation
  - Step 1: Account info (name, email, password, birthdate)
  - Step 2: Address info (town, region, postal code, home address)

### Auth Context
- ✅ `useAuth()` hook provides:
  - `user`: Current user profile
  - `session`: Supabase auth session
  - `loading`: Loading state
  - `signUp()`: Create new account
  - `signIn()`: Login with credentials
  - `signOut()`: Logout
  - `updateProfile()`: Update user data
  - `refreshUser()`: Reload user profile

### Protected Routes
- ✅ Unauthenticated users see: Welcome → Login/SignUp screens
- ✅ Authenticated users with complete profile see: Main app (Scanner, Home, Marketplace, Profile)
- ✅ Profile completion check enforced

### User Data Integration
- ✅ RecycleBin context uses authenticated user ID
- ✅ Profile screen shows authenticated user's name and stats
- ✅ Logout button in profile (top right)
- ✅ All scanned items tied to authenticated user
- ✅ Transactions and purchases tracked per user

## Tunisian Towns Supported

The app includes common Tunisian towns with auto-filled regions:
- Tunis (Tunis)
- Ariana (Ariana)
- Ben Arous (Ben Arous)
- Manouba (Manouba)
- Sfax (Sfax)
- Sousse (Sousse)
- Kairouan (Kairouan)
- Bizerte (Bizerte)
- Gabès (Gabès)
- Nabeul (Nabeul)

## Security Features

### Row Level Security (RLS)
- ✅ Users can only access their own scanned items
- ✅ Users can only update their own profile
- ✅ Public read access for categories and buyers
- ✅ Transactions tied to user accounts

### Password Requirements
- Minimum 8 characters
- Password confirmation required
- Show/hide password toggle for better UX

### Email Validation
- Valid email format required
- Unique email per account

## Testing the Auth Flow

### Test Signup
1. Run the app: `npm start`
2. Tap "Get Started" on Welcome screen
3. Fill in Step 1 (use any email, min 8 char password)
4. Fill in Step 2 (select a Tunisian town)
5. Tap "Complete Signup"
6. You're automatically logged in!

### Test Login
1. Tap "Already have an account? Log In" on Welcome screen
2. Enter your email and password
3. Tap "Log In"
4. Access the app with your saved data

### Test Logout
1. Go to Profile tab
2. Tap the logout icon (top right)
3. Confirm logout
4. You're back to Welcome screen

### Test Demo User (For Demo Purposes)
You can create a user with email `demo@dawwar.tn` to match the existing demo data in the database.

## Database Trigger

A PostgreSQL trigger automatically creates a user profile when someone signs up:

```sql
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
```

## Future Enhancements (Not Implemented Yet)

- ❌ Google OAuth
- ❌ Apple OAuth
- ❌ Email verification
- ❌ Password reset flow
- ❌ Profile picture upload
- ❌ Edit profile screen

## Important Notes

1. **No Email Verification**: For demo purposes, email verification is disabled. Users can sign up and immediately access the app.

2. **Profile Completion**: The two-step signup ensures users provide complete information before accessing the app.

3. **Data Persistence**: All user data (scanned items, transactions, achievements) is tied to the authenticated user and persists across sessions.

4. **Demo User**: The existing demo user (ID: `11111111-1111-1111-1111-111111111111`) remains in the database for testing purposes.

## Troubleshooting

### Issue: User not redirected after signup
- Wait 1-2 seconds for the profile to be created
- Check database trigger is enabled
- Verify Supabase connection in `.env`

### Issue: Login fails
- Ensure email is registered
- Check password is correct (min 8 characters)
- Verify Supabase Auth is enabled in your project

### Issue: Data not showing after login
- Ensure RLS policies are set correctly
- Check `auth_id` is set in users table
- Verify user profile was created via trigger

---

**Your app now has complete authentication! Users can sign up, log in, and all their data is securely stored and retrieved based on their account.**
