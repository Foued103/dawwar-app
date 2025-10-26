import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';

type RouteParams = {
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
};

export default function ConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'Confirmation'>>();
  const { buyer, totalItems, totalWeight, totalReward, totalCO2 } = route.params;

  const [scaleAnim] = React.useState(new Animated.Value(0));
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [confettiAnim] = React.useState(new Animated.Value(0));

  useEffect(() => {
    // Celebration animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Confetti animation
    Animated.loop(
      Animated.timing(confettiAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleViewProfile = () => {
    navigation.navigate('Profile' as never);
  };

  const handleBackToMarketplace = () => {
    navigation.navigate('Marketplace' as never);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.gradient}
      >
        {/* Celebration Icon */}
        <Animated.View
          style={[
            styles.celebrationCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Ionicons name="checkmark-circle" size={120} color={colors.textWhite} />
        </Animated.View>

        {/* Success Message */}
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>🎉 Sale Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your items have been successfully sold to
          </Text>
          <Text style={styles.buyerName}>{buyer.name}</Text>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="cash" size={32} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{totalReward} TND</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="leaf" size={32} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{totalCO2}g</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="cube" size={32} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{totalItems}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
        </Animated.View>

        {/* Transaction Details */}
        <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
          <Text style={styles.detailsTitle}>Transaction Details</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="business-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailLabel}>Buyer</Text>
            </View>
            <Text style={styles.detailValue}>{buyer.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailLabel}>Distance</Text>
            </View>
            <Text style={styles.detailValue}>{buyer.distance}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="scale-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailLabel}>Weight</Text>
            </View>
            <Text style={styles.detailValue}>{totalWeight} kg</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="star-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.detailLabel}>Rating</Text>
            </View>
            <Text style={styles.detailValue}>{buyer.rating} ⭐</Text>
          </View>

          <View style={[styles.detailRow, styles.detailRowTotal]}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="wallet-outline" size={16} color={colors.primary} />
              <Text style={[styles.detailLabel, styles.detailLabelTotal]}>Total Earnings</Text>
            </View>
            <Text style={styles.detailValueTotal}>{totalReward} TND</Text>
          </View>
        </Animated.View>

        {/* Impact Message */}
        <Animated.View style={[styles.impactCard, { opacity: fadeAnim }]}>
          <Text style={styles.impactText}>
            🌍 You've made a positive impact on the environment!
          </Text>
          <Text style={styles.impactSubtext}>
            Your contribution helps reduce waste and supports a circular economy.
          </Text>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleViewProfile}
          >
            <Text style={styles.primaryButtonText}>View My Profile</Text>
            <Ionicons name="person" size={20} color={colors.textWhite} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleBackToMarketplace}
          >
            <Text style={styles.secondaryButtonText}>Back to Marketplace</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? 40 : spacing.lg,
  },
  celebrationCircle: {
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },
  buyerName: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: withAlpha(colors.success, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  detailsTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRowTotal: {
    borderBottomWidth: 0,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  detailLabelTotal: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    fontSize: typography.fontSize.md,
  },
  detailValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  detailValueTotal: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  impactCard: {
    backgroundColor: withAlpha(colors.success, 0.15),
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  impactText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  impactSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textWhite,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.textWhite,
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
  },
});
