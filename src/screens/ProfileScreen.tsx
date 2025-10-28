import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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
      <StatusBar barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.settingsButton} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={22} color={colors.textWhite} />
          </TouchableOpacity>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={colors.textWhite} />
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lv {userStats.level}</Text>
            </View>
          </View>
          <Text style={styles.userName}>Dawwar User</Text>
          <View style={styles.rankBadge}>
            <Ionicons name="star" size={16} color={colors.warning} />
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
            <Text style={styles.quickStatValue}>{userStats.totalEarned.toFixed(2)}</Text>
            <Text style={styles.quickStatLabel}>TND Earned</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatValue}>{userStats.co2Saved}</Text>
            <Text style={styles.quickStatLabel}>kg CO₂ Saved</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'activity' && styles.tabActive]}
          onPress={() => setSelectedTab('activity')}
          activeOpacity={0.8}
        >
          <Ionicons
            name={selectedTab === 'activity' ? 'time' : 'time-outline'}
            size={18}
            color={selectedTab === 'activity' ? colors.textWhite : colors.textSecondary}
          />
          <Text style={[styles.tabText, selectedTab === 'activity' && styles.tabTextActive]}>
            Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
          onPress={() => setSelectedTab('achievements')}
          activeOpacity={0.8}
        >
          <Ionicons
            name={selectedTab === 'achievements' ? 'trophy' : 'trophy-outline'}
            size={18}
            color={selectedTab === 'achievements' ? colors.textWhite : colors.textSecondary}
          />
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
              <TouchableOpacity
                key={activity.id}
                style={styles.activityCard}
                activeOpacity={0.7}
              >
                <View style={[styles.activityIcon, { backgroundColor: withAlpha(activity.color, 0.12) }]}>
                  <Ionicons name={activity.icon} size={22} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  {activity.buyer && (
                    <Text style={styles.activityBuyer}>{activity.buyer}</Text>
                  )}
                  <View style={styles.activityMeta}>
                    <View style={styles.activityMetaItem}>
                      <Ionicons name="leaf-outline" size={14} color={colors.success} />
                      <Text style={styles.activityMetaText}>{activity.co2}g CO₂</Text>
                    </View>
                    <View style={styles.activityMetaItem}>
                      <Ionicons name="time-outline" size={14} color={colors.textLight} />
                      <Text style={styles.activityMetaText}>{activity.date}</Text>
                    </View>
                  </View>
                </View>
                {activity.amount > 0 && (
                  <View style={styles.amountContainer}>
                    <Text style={styles.activityAmount}>+{activity.amount.toFixed(2)}</Text>
                    <Text style={styles.activityCurrency}>TND</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Achievements
          <View style={styles.achievementsContainer}>
            {achievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={[
                  styles.achievementCard,
                  !achievement.unlocked && styles.achievementCardLocked,
                ]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.achievementIcon,
                    achievement.unlocked
                      ? { backgroundColor: withAlpha(colors.warning, 0.15) }
                      : { backgroundColor: colors.surfaceDark },
                  ]}
                >
                  <Ionicons
                    name={achievement.icon}
                    size={28}
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
                    <Ionicons name="checkmark-circle" size={28} color={colors.success} />
                  </View>
                )}
              </TouchableOpacity>
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
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: withAlpha(colors.textWhite, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: withAlpha(colors.textWhite, 0.25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: withAlpha(colors.textWhite, 0.5),
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs - 2,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  levelText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.sm,
    letterSpacing: 0.3,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withAlpha(colors.textWhite, 0.25),
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: 20,
    gap: spacing.xs,
  },
  rankText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
    letterSpacing: 0.3,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    marginBottom: spacing.xs - 2,
    letterSpacing: 0.5,
  },
  quickStatLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textWhite,
    opacity: 0.85,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  quickStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: withAlpha(colors.textWhite, 0.25),
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    letterSpacing: 0.3,
  },
  tabTextActive: {
    color: colors.textWhite,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  activityContainer: {
    gap: spacing.md,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs - 2,
    letterSpacing: 0.2,
  },
  activityBuyer: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    letterSpacing: 0.1,
  },
  activityMeta: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  activityMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs - 2,
  },
  activityMetaText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    letterSpacing: 0.1,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  activityAmount: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.success,
    letterSpacing: 0.3,
  },
  activityCurrency: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textSecondary,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  achievementsContainer: {
    gap: spacing.md,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md + spacing.xs,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementCardLocked: {
    opacity: 0.65,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementContent: {
    flex: 1,
    justifyContent: 'center',
  },
  achievementTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs - 2,
    letterSpacing: 0.2,
  },
  achievementTitleLocked: {
    color: colors.textSecondary,
  },
  achievementDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    letterSpacing: 0.1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 7,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.textSecondary,
    minWidth: 38,
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  unlockedBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
  },
});
