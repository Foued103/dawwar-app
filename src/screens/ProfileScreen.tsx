import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../theme';
import { withAlpha } from '../utils/color';

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState<'activity' | 'achievements'>('activity');

  // User stats - in real app, would come from context/API
  const userStats = {
    itemsSold: 45,
    totalEarned: 856.50,
    co2Saved: 12.8,
    rank: 'Eco Warrior',
    level: 7,
  };

  const activityHistory = [
    {
      id: '1',
      type: 'sale',
      title: 'Sold 10 Plastic Bottles',
      buyer: 'EcoRecycle Center',
      amount: 15.50,
      co2: 245,
      date: '2 hours ago',
      icon: 'checkmark-circle',
      color: colors.success,
    },
    {
      id: '2',
      type: 'sale',
      title: 'Sold Aluminum Cans',
      buyer: 'Green Earth Tunisia',
      amount: 22.00,
      co2: 380,
      date: '1 day ago',
      icon: 'checkmark-circle',
      color: colors.success,
    },
    {
      id: '3',
      type: 'scan',
      title: 'Scanned Glass Bottles',
      buyer: null,
      amount: 0,
      co2: 150,
      date: '2 days ago',
      icon: 'scan',
      color: colors.info,
    },
    {
      id: '4',
      type: 'sale',
      title: 'Sold Paper & Cardboard',
      buyer: 'Tunisia Recycling Co.',
      amount: 18.75,
      co2: 520,
      date: '3 days ago',
      icon: 'checkmark-circle',
      color: colors.success,
    },
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Sale',
      description: 'Complete your first transaction',
      icon: 'trophy',
      unlocked: true,
      progress: 100,
    },
    {
      id: '2',
      title: 'Eco Warrior',
      description: 'Sell 50 items',
      icon: 'shield-checkmark',
      unlocked: false,
      progress: 90,
    },
    {
      id: '3',
      title: 'Green Champion',
      description: 'Save 20kg of CO₂',
      icon: 'leaf',
      unlocked: false,
      progress: 64,
    },
    {
      id: '4',
      title: 'Community Hero',
      description: 'Help 10 different buyers',
      icon: 'people',
      unlocked: true,
      progress: 100,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={56} color={colors.textWhite} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv {userStats.level}</Text>
            </View>
          </View>
          <Text style={styles.userName}>Dawwar User</Text>
          <View style={styles.rankBadge}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.rankText}>{userStats.rank}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{userStats.itemsSold}</Text>
            <Text style={styles.quickStatLabel}>Items Sold</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{userStats.totalEarned} TND</Text>
            <Text style={styles.quickStatLabel}>Total Earned</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{userStats.co2Saved} kg</Text>
            <Text style={styles.quickStatLabel}>CO₂ Saved</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Impact Cards */}
      <View style={styles.impactCardsContainer}>
        <View style={styles.impactCard}>
          <View style={[styles.impactIcon, { backgroundColor: withAlpha(colors.success, 0.1) }]}>
            <Ionicons name="cash" size={28} color={colors.success} />
          </View>
          <View style={styles.impactContent}>
            <Text style={styles.impactValue}>{userStats.totalEarned.toFixed(2)} TND</Text>
            <Text style={styles.impactLabel}>Total Earnings</Text>
          </View>
          <View style={styles.impactTrend}>
            <Ionicons name="trending-up" size={16} color={colors.success} />
            <Text style={styles.impactTrendText}>+12%</Text>
          </View>
        </View>

        <View style={styles.impactCard}>
          <View style={[styles.impactIcon, { backgroundColor: withAlpha(colors.primary, 0.1) }]}>
            <Ionicons name="leaf" size={28} color={colors.primary} />
          </View>
          <View style={styles.impactContent}>
            <Text style={styles.impactValue}>{userStats.co2Saved.toFixed(1)} kg</Text>
            <Text style={styles.impactLabel}>CO₂ Reduced</Text>
          </View>
          <View style={styles.impactTrend}>
            <Ionicons name="trending-up" size={16} color={colors.success} />
            <Text style={styles.impactTrendText}>+8%</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'activity' && styles.tabActive]}
          onPress={() => setSelectedTab('activity')}
        >
          <Text style={[styles.tabText, selectedTab === 'activity' && styles.tabTextActive]}>
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
          onPress={() => setSelectedTab('achievements')}
        >
          <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
            Achievements
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'activity' ? (
          // Activity History
          <View style={styles.activityContainer}>
            {activityHistory.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={[styles.activityIcon, { backgroundColor: withAlpha(activity.color, 0.1) }]}>
                  <Ionicons name={activity.icon} size={24} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  {activity.buyer && (
                    <Text style={styles.activityBuyer}>Buyer: {activity.buyer}</Text>
                  )}
                  <View style={styles.activityMeta}>
                    <View style={styles.activityMetaItem}>
                      <Ionicons name="leaf-outline" size={12} color={colors.textSecondary} />
                      <Text style={styles.activityMetaText}>{activity.co2}g CO₂</Text>
                    </View>
                    <View style={styles.activityMetaItem}>
                      <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                      <Text style={styles.activityMetaText}>{activity.date}</Text>
                    </View>
                  </View>
                </View>
                {activity.amount > 0 && (
                  <Text style={styles.activityAmount}>+{activity.amount} TND</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          // Achievements
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementCardLocked,
                ]}
              >
                <View
                  style={[
                    styles.achievementIcon,
                    achievement.unlocked
                      ? { backgroundColor: withAlpha(colors.warning, 0.1) }
                      : { backgroundColor: colors.border },
                  ]}
                >
                  <Ionicons
                    name={achievement.icon}
                    size={32}
                    color={achievement.unlocked ? colors.warning : colors.textLight}
                  />
                </View>
                <View style={styles.achievementContent}>
                  <Text
                    style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.achievementTitleLocked,
                    ]}
                  >
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  {!achievement.unlocked && (
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${achievement.progress}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>{achievement.progress}%</Text>
                    </View>
                  )}
                </View>
                {achievement.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: withAlpha(colors.textWhite, 0.15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: withAlpha(colors.textWhite, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.textWhite,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  levelText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  userName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.xs,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withAlpha(colors.textWhite, 0.2),
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    gap: 4,
  },
  rankText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: spacing.lg,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textWhite,
    opacity: 0.8,
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: withAlpha(colors.textWhite, 0.2),
  },
  impactCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: -30,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  impactCard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  impactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  impactContent: {
    flex: 1,
  },
  impactValue: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 2,
  },
  impactLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  impactTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  impactTrendText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.success,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.textWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  activityContainer: {
    gap: spacing.sm,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: 4,
  },
  activityBuyer: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  activityMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityMetaText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  activityAmount: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
  },
  achievementsContainer: {
    gap: spacing.md,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  achievementDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    width: 40,
  },
  unlockedBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
