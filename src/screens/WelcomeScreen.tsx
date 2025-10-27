import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="leaf" size={64} color={colors.textWhite} />
            </View>
            <Text style={styles.appName}>Dawwar</Text>
            <Text style={styles.tagline}>Turn Waste Into Cash</Text>
          </View>

          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="scan" size={24} color={colors.textWhite} />
              <Text style={styles.featureText}>Scan recyclables with AI</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="cash" size={24} color={colors.textWhite} />
              <Text style={styles.featureText}>Earn money instantly</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="leaf" size={24} color={colors.textWhite} />
              <Text style={styles.featureText}>Save the environment</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => navigation.navigate('SignUp' as never)}
          >
            <Text style={styles.signupButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.loginButtonText}>Already have an account? Log In</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: withAlpha(colors.textWhite, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 3,
    borderColor: colors.textWhite,
  },
  appName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.fontSize.lg,
    color: colors.textWhite,
    opacity: 0.9,
  },
  features: {
    gap: spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    fontSize: typography.fontSize.md,
    color: colors.textWhite,
    opacity: 0.95,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? 50 : spacing.xl,
  },
  signupButton: {
    flexDirection: 'row',
    backgroundColor: colors.textWhite,
    paddingVertical: spacing.md,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  signupButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  loginButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.textWhite,
    opacity: 0.9,
  },
});
