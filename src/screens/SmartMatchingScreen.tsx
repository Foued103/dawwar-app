import React, { useState, useEffect } from 'react';
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
  SmartMatching: {
    totalItems: number;
    totalWeight: string;
    totalReward: string;
    totalCO2: string;
  };
};

export default function SmartMatchingScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'SmartMatching'>>();
  const { totalItems, totalWeight, totalReward, totalCO2 } = route.params;

  const [stage, setStage] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const buyers = [
    {
      id: '1',
      name: 'EcoRecycle Center',
      distance: '1.2 km',
      rating: 4.8,
      price: totalReward,
      verified: true,
      responseTime: 'Fast',
      matchScore: 98,
    },
    {
      id: '2',
      name: 'Green Earth Tunisia',
      distance: '2.5 km',
      rating: 4.7,
      price: (parseFloat(totalReward) * 0.95).toFixed(1),
      verified: true,
      responseTime: 'Medium',
      matchScore: 92,
    },
    {
      id: '3',
      name: 'Tunisia Recycling Co.',
      distance: '3.8 km',
      rating: 4.6,
      price: (parseFloat(totalReward) * 0.9).toFixed(1),
      verified: false,
      responseTime: 'Medium',
      matchScore: 85,
    },
  ];

  useEffect(() => {
    // Stage 0: Analyzing (1s)
    const timer1 = setTimeout(() => setStage(1), 1000);
    
    // Stage 1: Finding buyers (1.5s)
    const timer2 = setTimeout(() => setStage(2), 2500);
    
    // Stage 2: Matching complete
    const timer3 = setTimeout(() => {
      setStage(3);
      // Animate in results
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleSelectBuyer = (buyer: typeof buyers[0]) => {
    navigation.navigate('Confirmation' as never, {
      buyer,
      totalItems,
      totalWeight,
      totalReward: buyer.price,
      totalCO2,
    } as never);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Matching</Text>
        <View style={{ width: 44 }} />
      </View>

      {stage < 3 ? (
        // Loading States
        <View style={styles.loadingContainer}>
          <View style={styles.loaderCircle}>
            <Ionicons 
              name={stage === 0 ? 'analytics' : stage === 1 ? 'search' : 'checkmark-circle'} 
              size={64} 
              color={colors.primary} 
            />
          </View>
          
          <Text style={styles.loadingTitle}>
            {stage === 0 && '🤖 Analyzing Your Items...'}
            {stage === 1 && '🔍 Finding Best Buyers...'}
            {stage === 2 && '✨ Matching Complete!'}
          </Text>
          
          <Text style={styles.loadingSubtitle}>
            {stage === 0 && 'AI is evaluating your recyclables'}
            {stage === 1 && 'Searching 127 nearby buyers'}
            {stage === 2 && 'Found 3 perfect matches for you'}
          </Text>

          {/* Progress dots */}
          <View style={styles.progressDots}>
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i <= stage && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>
      ) : (
        // Results
        <Animated.ScrollView
          style={[styles.resultsContainer, { opacity: fadeAnim }]}
          contentContainerStyle={styles.resultsContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Card */}
          <Animated.View 
            style={[
              styles.summaryCard,
              { transform: [{ scale: scaleAnim }] }
            ]}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.summaryGradient}
            >
              <Text style={styles.summaryTitle}>🎯 Best Match Found!</Text>
              <Text style={styles.summarySubtitle}>
                {totalItems} items • {totalWeight} kg • {totalCO2}g CO₂ saved
              </Text>
            </LinearGradient>
          </Animated.View>

          {/* Buyers List */}
          <Text style={styles.sectionTitle}>Top Matches</Text>
          
          {buyers.map((buyer, index) => (
            <TouchableOpacity
              key={buyer.id}
              style={[
                styles.buyerCard,
                index === 0 && styles.buyerCardBest,
              ]}
              onPress={() => handleSelectBuyer(buyer)}
            >
              {index === 0 && (
                <View style={styles.bestMatchBadge}>
                  <Ionicons name="star" size={12} color={colors.warning} />
                  <Text style={styles.bestMatchText}>Best Match</Text>
                </View>
              )}

              <View style={styles.buyerHeader}>
                <View style={styles.buyerIconContainer}>
                  <Ionicons name="business" size={28} color={colors.primary} />
                </View>
                <View style={styles.buyerInfo}>
                  <View style={styles.buyerNameRow}>
                    <Text style={styles.buyerName}>{buyer.name}</Text>
                    {buyer.verified && (
                      <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                    )}
                  </View>
                  <View style={styles.buyerMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="location" size={12} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{buyer.distance}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={12} color={colors.warning} />
                      <Text style={styles.metaText}>{buyer.rating}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="time" size={12} color={colors.textSecondary} />
                      <Text style={styles.metaText}>{buyer.responseTime}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.buyerFooter}>
                <View style={styles.matchScoreContainer}>
                  <Text style={styles.matchScoreLabel}>Match Score</Text>
                  <View style={styles.matchScoreBar}>
                    <View style={[styles.matchScoreFill, { width: `${buyer.matchScore}%` }]} />
                  </View>
                  <Text style={styles.matchScoreValue}>{buyer.matchScore}%</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Offer</Text>
                  <Text style={styles.price}>{buyer.price} TND</Text>
                </View>
              </View>

              <View style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select This Buyer</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.primary} />
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  loaderCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: withAlpha(colors.primary, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  loadingTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  loadingSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  progressDots: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: spacing.lg,
  },
  summaryCard: {
    marginBottom: spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  summaryGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  summarySubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textWhite,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  buyerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buyerCardBest: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
  },
  bestMatchBadge: {
    position: 'absolute',
    top: -8,
    right: spacing.md,
    backgroundColor: colors.warning,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    zIndex: 1,
  },
  bestMatchText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  buyerHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  buyerIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: withAlpha(colors.primary, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  buyerInfo: {
    flex: 1,
  },
  buyerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  buyerName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  buyerMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  buyerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  matchScoreContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  matchScoreLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  matchScoreBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  matchScoreFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  matchScoreValue: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.success,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: withAlpha(colors.primary, 0.08),
    paddingVertical: spacing.sm,
    borderRadius: 12,
    gap: spacing.xs,
  },
  selectButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },
});
